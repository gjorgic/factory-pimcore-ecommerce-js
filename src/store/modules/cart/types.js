import types from '~/util/types'

export const MutationTypes = {
    INITIALIZE_BEFORE: 'initializeBefore',
    INITIALIZE_AFTER: 'initializeAfter',

    ADD_TO_CART_REQUEST: 'addToCartBefore',
    ADD_TO_CART_SUCCESS: 'addToCartSuccess',
    ADD_TO_CART_FAIL: 'addToCartFail',

    REMOVE_FROM_CART_REQUEST: 'removeFromCartBefore',
    REMOVE_FROM_CART_SUCCESS: 'removeFromCartSuccess',
    REMOVE_FROM_CART_FAIL: 'removeFromCartFail',

    UPDATE_PRODUCT_QUANTITY_REQUEST: 'updateProductQuantityBefore',
    UPDATE_PRODUCT_QUANTITY_SUCCESS: 'updateProductQuantitySuccess',
    UPDATE_PRODUCT_QUANTITY_FAIL: 'updateProductQuantityFail',

    INCREMENT_PRODUCT_QUANTITY_REQUEST: 'incrementProductQuantityBefore',
    INCREMENT_PRODUCT_QUANTITY_SUCCESS: 'incrementProductQuantitySuccess',
    INCREMENT_PRODUCT_QUANTITY_FAIL: 'incrementProductQuantityFail',

    DECREMENT_PRODUCT_QUANTITY_REQUEST: 'decrementProductQuantityBefore',
    DECREMENT_PRODUCT_QUANTITY_SUCCESS: 'decrementProductQuantitySuccess',
    DECREMENT_PRODUCT_QUANTITY_FAILY: 'decrementProductQuantityFail',

    GET_CART_REQUEST: 'getCartBefore',
    GET_CART_SUCCESS: 'getCartSuccess',
    GET_CART_FAIL: 'getCartFail',

    ADD_COUPON_CODE_REQUEST: 'addCouponCodeRequest',
    ADD_COUPON_CODE_FAIL: 'addCouponCodeFail',
    ADD_COUPON_CODE_SUCCESS: 'addCouponCodeSuccess',

    REMOVE_COUPON_CODE_REQUEST: 'removeCouponCodeRequest',
    REMOVE_COUPON_CODE_FAIL: 'removeCouponCodeFail',
    REMOVE_COUPON_CODE_SUCCESS: 'removeCouponCodeSuccess'
}


export const ActionTypes = {
    INITIALIZE: 'initialize',
    GET_CART: 'getCart',
    ADD_TO_CART: 'addToCart',
    REMOVE_FROM_CART: 'removeFromCart',
    UPDATE_PRODUCT_QUANTITY: 'updateProductQuantity',
    INCREMENT_PRODUCT_QUANTITY: 'incrementProductQuantity',
    DECREMENT_PRODUCT_QUANTITY: 'decrementProductQuantity',
    ADD_COUPON_CODE: 'addCouponCode',
    REMOVE_COUPON_CODE: 'removeCouponCode',
}