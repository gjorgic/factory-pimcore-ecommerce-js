import { MutationTypes, ActionTypes } from "./types";
import CartApi from "~/api/CartApi";

const updateStateWithCart = function (state, cart) {
    state.products = [...cart.products];
    state.modifications = [...cart.modifications];
    state.totalPrice = cart.totalPrice;
    state.subtotalPrice = cart.subtotalPrice;
}

export default {
    namespaced: true,
    state: {
        error: null,
        requesting: false,
        init: false,
        products: [],
        modifications: [],
        totalPrice: null,
        subtotalPrice: null
    },
    getters: {
        product (state) {
            return (id) => {
                return state.products
                    .filter(product => prodict.id == id)[0] || null
            }
        },
        productQuantity (state, getters) {
            if (getters.product(id)) {
                return getters.product(id).quantity
            }

            return null;
        },
        productUnitPrice (state, getters) {
            if (getters.product(id)) {
                return getters.product(id).unitPrice
            }

            return null;
        },
        productTotalPrice (state, getters) {
            if (getters.product(id)) {
                return getters.product(id).totalPrice
            }

            return null;
        },
        productModification (state, getters) {
            if (getters.product(id)) {
                return getters.product(id).modification
            }

            return null;
        }
    },
    mutations: {
        [MutationTypes.INITIALIZE_BEFORE] (state) {
            state.init = false;
        },
        [MutationTypes.INITIALIZE_AFTER] (state) {
            state.init = true;
        },
        [MutationTypes.ADD_TO_CART_REQUEST] (state, payload) {
            state.error = null;
            state.requesting = true;
        },
        [MutationTypes.ADD_TO_CART_FAIL] (state, error) {
            state.requesting = false;
            state.error = error;
        },
        [MutationTypes.ADD_TO_CART_SUCCESS] (state, product) {
            // we fetch whole cart after this -> look action `ADD_TO_CART`
        },
        [MutationTypes.REMOVE_FROM_CART_REQUEST] (state, payload) {
            state.error = null;
            state.requesting = true;
        },
        [MutationTypes.REMOVE_FROM_CART_FAIL] (state, error) {
            state.requesting = false;
            state.error = error;
        },
        [MutationTypes.REMOVE_FROM_CART_SUCCESS] (state, cart) {
            updateStateWithCart(state, cart);
            state.requesting = false;
        },
        [MutationTypes.UPDATE_PRODUCT_QUANTITY_REQUEST] (state, payload) {
            state.error = null;
            state.requesting = true;
        },
        [MutationTypes.UPDATE_PRODUCT_QUANTITY_FAIL] (state, error) {
            state.requesting = false;
            state.error = error;
        },
        [MutationTypes.UPDATE_PRODUCT_QUANTITY_SUCCESS] (state, cart) {
            updateStateWithCart(state, cart);
            state.requesting = false;
        },
        [MutationTypes.GET_CART_REQUEST] (state, payload) {
            state.error = null;
            state.requesting = true;
        },
        [MutationTypes.GET_CART_FAIL] (state, error) {
            state.requesting = false;
            state.error = error;
        },
        [MutationTypes.GET_CART_SUCCESS] (state, cart) {
            updateStateWithCart(state, cart);
            state.requesting = false;
        },
    },
    actions: {
        [ActionTypes.INITIALIZE] (store, config) {
            store.commit(MutationTypes.INITIALIZE_BEFORE);

            return store.dispatch(ActionTypes.GET_CART)
                .then(() => {
                    store.commit(MutationTypes.INITIALIZE_AFTER);
                });
        },
        [ActionTypes.ADD_TO_CART]: function (store, payload) {
            store.commit({ type: MutationTypes.ADD_TO_CART_REQUEST, payload });

            return CartApi.addProduct(payload.id, payload.quantity)
                .catch(error => store.commit({ type: MutationTypes.ADD_TO_CART_FAIL, error }))
                .then(product => store.commit({ type: MutationTypes.ADD_TO_CART_SUCCESS, product }))
                .then(() => {
                    return store.dispatch(ActionTypes.GET_CART);
                })
        },
        [ActionTypes.REMOVE_FROM_CART]: function (store, payload) {
            store.commit({ type: MutationTypes.REMOVE_FROM_CART_REQUEST, payload });

            return CartApi.removeProduct(payload.id)
                .catch(error => store.commit({ type: MutationTypes.REMOVE_FROM_CART_FAIL, error }))
                .then(cart => store.commit({ type: MutationTypes.REMOVE_FROM_CART_SUCCESS, cart }))
        },
        [ActionTypes.UPDATE_PRODUCT_QUANTITY]: function (store, payload) {
            store.commit({ type: MutationTypes.UPDATE_PRODUCT_QUANTITY_REQUEST, payload });

            return CartApi.updateQuantity({
                    [payload.id]: payload.quantity
                })
                .catch(error => store.commit({ type: MutationTypes.UPDATE_PRODUCT_QUANTITY_FAIL, error }))
                .then(cart => store.commit({ type: MutationTypes.UPDATE_PRODUCT_QUANTITY_SUCCESS, cart }))
        },
        [ActionTypes.INCREMENT_PRODUCT_QUANTITY]: function (store, payload) {
            return store.dispatch(ActionTypes.UPDATE_PRODUCT_QUANTITY, {
                id: payload.id,
                quantity: store.getters.productQuantity(payload.id) + 1
            });
        },
        [ActionTypes.DECREMENT_PRODUCT_QUANTITY]: function (store, payload) {
            return store.dispatch(ActionTypes.UPDATE_PRODUCT_QUANTITY, {
                id: payload.id,
                quantity: store.getters.productQuantity(payload.id) - 1
            });
        },
        [ActionTypes.GET_CART]: function (store, payload) {
            store.commit({ type: MutationTypes.GET_CART_REQUEST, payload });

            return CartApi.getCart()
                .catch(error => store.commit({ type: MutationTypes.GET_CART_FAIL, error }))
                .then(cart => store.commit({ type: MutationTypes.GET_CART_SUCCESS, cart }))
        },

        [ActionTypes.ADD_COUPON_CODE]: function (store, payload) {
            store.commit({ type: MutationTypes.ADD_COUPON_CODE_REQUEST, payload });

            return CartApi.addCouponCode(payload.coupon)
                .catch(error => store.commit({ type: MutationTypes.ADD_COUPON_CODE_FAIL, error }))
                .then(cart => store.commit({ type: MutationTypes.ADD_COUPON_CODE_SUCCESS, cart }))
        },
        [ActionTypes.REMOVE_COUPON_CODE]: function (store, payload) {
            store.commit({ type: MutationTypes.REMOVE_COUPON_CODE_REQUEST, payload });

            return CartApi.removeCouponCode()
                .catch(error => store.commit({ type: MutationTypes.REMOVE_COUPON_CODE_FAIL, error }))
                .then(cart => store.commit({ type: MutationTypes.REMOVE_COUPON_CODE_SUCCESS, cart }))
        }
    }
}
