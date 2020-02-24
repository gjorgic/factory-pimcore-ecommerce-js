import { MutationTypes, ActionTypes } from "./types";
import CartApi from "~/api/CartApi";

const updateStateWithProductInfo = function (state, data) {
    state.attributes = data.attributes.map(attribute => ({
        label: attribute.label,
        element: attribute.element,
    }))

    state.options = data.attributes.reduce((options, attribute) => {
        return [
            ...options,
            ...attribute.options.map(option => ({
                id: option.id,
                attributeId: attribute.id,
                label: option.label,
            }))
        ];
    }, [])

    state.variations = data.variations.map(variant => ({
        id: variant.id,
        name: variant.name,
        quantity: variant.quantity,
        price: variant.price,
        options: variant.options,
    }))
}

const setSelection = function (state, attributeId, optionId) {
    let selections = {...state.selections}
    selections[attributeId] = optionId;

    state.selections = Object.keys(selections)
        .filter(key => selections[key])
        .reduce((data, key) => {
            data[key] = selections[key]

            return data
        }, {});
}

const unsetSelection = function (state, attributeId) {
    setSelection(state, attributeId, null)
}

const filterProductForGivenSelections = function (selections, products) {
    return products.filter(product => {
        Object.values(product.options)
            .some(productOption => selections.includes(productOption))
    })
}

const intersect = function (array1, array2) {
    return array2.filter(item => array1.includes(item));
}

const priceFunc = function (_price) {
    return {
        price_str: Math.round(_price * 100)+" KD",
        price: Math.round(_price * 100),
        currency: 'KD'
    }
}

export default {
    namespaced: true,
    state: {
        attributes: {
            '1': {id: '1', label: "Color", element: 'selectbox'},
            '2': {id: '2', label: "Size", element: 'selectbox'}
        },
        options: {
            '1': {id: '1', attributeId: '1', label: 'Red'},
            '2': {id: '2', attributeId: '1', label: 'Green'},
            '3': {id: '3', attributeId: '2', label: 'S'},
            '4': {id: '4', attributeId: '2', label: 'M'}
        },
        variations: [
            {
                id: 1,
                name: "",
                quantity: 3,
                regularPrice: priceFunc(1.2),
                specialPrice: priceFunc(1.2 - 0.3),
                options: {'1': '1', '2': '3'},
            },
            {
                id: 2,
                name: "",
                quantity: 3,
                regularPrice: priceFunc(2.2),
                specialPrice: priceFunc(2.2 - 0.3),
                options: {'1': '1', '2': '4'},
            },
            {
                id: 3,
                name: "",
                quantity: 3,
                regularPrice: priceFunc(3.2),
                specialPrice: priceFunc(3.2 - 0.3),
                options: {'1': '2', '2': '3'},
            },
            {
                id: 4,
                name: "",
                quantity: 3,
                regularPrice: priceFunc(5.2),
                specialPrice: priceFunc(5.2 - 0.3),
                options: {'1': '2', '2': '4'},
            }
        ],
        quantity: 1,
        selections: {},
    },
    getters: {
        availableAttributes (state, getters) {
            return Object.values(state.attributes)
                .filter(attribute => {
                    return getters.attributeOptions(attribute.id).length > 0;
                })
        },
        attributeOptions (state, getters) {
            return (attributeId) => {
                return Object.values(state.options)
                    .filter(option => {
                        return option.attributeId == attributeId
                    })
            }
        },
        availableAttributeOptions (state, getters) {
            return (attributeId) => {
                let tempState = {
                    selections: {...state.selections}
                }

                unsetSelection(tempState, attributeId)

                let optionToQuantity = filterProductForGivenSelections(
                    tempState.selections,
                    state.products
                ).reduce((data, product) => {
                    data[product.options[attributeId]] = product.quantity;

                    return data;
                }, {})

                return getters.attributeOptions(attributeId)
                    .filter(option => {
                        // dohvati barem jedan produkt
                        return optionToQuantity[option.id]
                    })
            }
        },
        matchingVariations (state, getters) {
            return state.variations.filter(variant => {
                let selectedValues = Object.values(state.selections);
                let variantOptionValues = Object.values(variant.options);

                if (selectedValues.length == 0) {
                    return true;
                }

                return intersect(variantOptionValues, selectedValues).length == selectedValues.length
            })
        },
        absoluteLowestPrice (state, getters) {
            let lowestToHigher = state.variations.sort((variant1, variant2) => {
                let price1 = (variant1.specialPrice || variant1.regulatPrice)
                let price2 = (variant2.specialPrice || variant2.regulatPrice)

                if (price1.price == price2.price) {
                    return 0;
                }

                return price1.price > price2.price ? 1 : -1;
            })

            if (!lowestToHigher[0]) {
                return null;
            }

            return (lowestToHigher[0].specialPrice || lowestToHigher[0].regularPrice);
        },
        relativeLowestPrice (state, getters) {
            let lowestToHigher = getters.matchingVariations.sort((variant1, variant2) => {
                let price1 = (variant1.specialPrice || variant1.regulatPrice)
                let price2 = (variant2.specialPrice || variant2.regulatPrice)

                if (price1.price == price2.price) {
                    return 0;
                }

                return price1.price > price2.price ? 1 : -1;
            })

            if (!lowestToHigher[0]) {
                return null;
            }

            return (lowestToHigher[0].specialPrice || lowestToHigher[0].regularPrice);
        },
        specialPrice (state, getters) {
            if (!getters.allFiltersSelected || !getters.matchingVariations.length) {
                return null;
            }

            return getters.matchingVariations[0].specialPrice;
        },
        regularPrice (state, getters) {
            if (!getters.allFiltersSelected || !getters.matchingVariations.length) {
                return null;
            }

            return getters.matchingVariations[0].regularPrice;
        },
        allFiltersSelected (state, getters) {
            return Object.keys(state.selections).length == getters.availableAttributes.length
        },
        selectedVariant (state, getters) {
            if (!getters.allFiltersSelected) {
                return null;
            }

            return getters.matchingVariations[0] || null;
        }
    },
    mutations: {
        [MutationTypes.INITIALIZE] (state, productInfo) {
            updateStateWithProductInfo(state, productInfo);
        },
        [MutationTypes.RESET_OPTIONS] () {
            this.selections = {};
        },
        [MutationTypes.CHOSE_OPTION] (state, {attributeId, optionId}) {
            setSelection(state, attributeId, optionId)
        },
        [MutationTypes.TOGGLE_OPTION] (state, { attributeId, optionId }) {
            if (selections[attributeId] == optionId || !optionId) {
                unsetSelection(state, attributeId);
            } else {
                setSelection(state, attributeId, optionId)
            }
        },
        [MutationTypes.INCREMENT_QUANTITY] (state) {
            state.quantity = state.quantity + 1;
        },
        [MutationTypes.DECREMENT_QUANTITY] (state) {
            state.quantity = Math.max(state.quantity - 1, 0);
        },
        [MutationTypes.UPDATE_QUANTITY] (state, payload) {
            state.quantity = Math.max(payload.quantity, 0);
        },
    },
    actions: {}
}
