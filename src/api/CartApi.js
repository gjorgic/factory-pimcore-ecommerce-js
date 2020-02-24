const axios = require('axios');

export default {
    addProduct (id, quantity) {
        let lang = 'en';
        return axios.post(`/${lang}/cart`, { id, quantity });
    },
    removeProduct (id) {
        let lang = 'en';
        return axios.post(`/${lang}/cart`, { id });
    },
    updateQuantity (payload) {
        let lang = 'en';
        return axios.post(`/${lang}/cart`, payload);
    },
    getCart () {
        let lang = 'en';
        return axios.get(`/${lang}/cart`, {
            params: {}
        });
    },
    addCouponCode (coupon) {
        let lang = 'en';
        return axios.post(`/${lang}/cart`, { coupon });
    },
    removeCouponCode () {
        let lang = 'en';
        return axios.post(`/${lang}/cart`);
    },
}