import { createNamespacedHelpers } from 'vuex'
import { MutationTypes } from '~/store/modules/product/types'

const { mapState, mapActions, mapGetters, mapMutations } = createNamespacedHelpers('ecommerce/product')

export const methods = {
    ...mapMutations({
        productChoseOption: MutationTypes.CHOSE_OPTION,
        productToggleOption: MutationTypes.TOGGLE_OPTION
    })
}

export const computed = {
    ...mapGetters({
        productAttributeOptions: 'attributeOptions',
        productAvailableAttributes: 'availableAttributes',
        productAvailableAttributeOptions: 'availableAttributeOptions',

        productMatchingVariations: 'matchingVariations',
        productAbsoluteLowestPrice: 'absoluteLowestPrice',
        productRelativeLowestPrice: 'relativeLowestPrice',
        productAllFiltersSelected: 'allFiltersSelected',
        productSpecialPrice: 'specialPrice',
        productRegularPrice: 'regularPrice',
        productSelectedVariant: 'selectedVariant'
    })
}
