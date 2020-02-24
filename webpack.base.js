const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            '~': path.resolve( __dirname, 'src/')
        }
    },
};
