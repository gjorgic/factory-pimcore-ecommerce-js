const types = function (data) {
    if (Array.isArray(data)) {
        data.reduce((obj, name) => {
            obj[name] = name;

            return obj;
        }, {})
    }

    if (typeof data == "object") {
        return types(Object.keys(data))
    }
}

export default types;