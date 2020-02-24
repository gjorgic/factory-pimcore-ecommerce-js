import { createNamespacedHelpers } from 'vuex'
import { ActionTypes } from "~/store/modules/cart/types";

const { mapState, mapActions } = createNamespacedHelpers('ecommerce/cart')

export const methods = {
    ...mapActions({
        addProduct: ActionTypes.ADD_TO_CART,
        removeProduct: ActionTypes.REMOVE_FROM_CART,
        incrementProduct: ActionTypes.INCREMENT_PRODUCT_QUANTITY,
        decrementProduct: ActionTypes.DECREMENT_PRODUCT_QUANTITY,
        updateProduct: ActionTypes.UPDATE_PRODUCT_QUANTITY,

        addCoupon: ActionTypes.ADD_COUPON_CODE,
        removeCoupon: ActionTypes.REMOVE_COUPON_CODE
    })
}

export const computed = {
    ...mapState({
        cartProducts: state => state.products,
        cartDatarequesting: state => state.requesting,
        cartError: state => state.error
    })
}