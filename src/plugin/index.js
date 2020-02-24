import * as allModules from '../store/modules/index.js'

export const createEcommerceStorePlugin = function (config) {
    return store => {
        if (!store._modules.get(['ecommerce'])) {
            store.registerModule(['ecommerce'], {
                namespaced: true,
            });
        }

        Object.keys(allModules)
            .forEach(function (name) {
                console.log('name', allModules, allModules[name])
                store.registerModule(['ecommerce', name], allModules[name])
            })
    }
}