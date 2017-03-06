'use strict';
const webpack = require('webpack');

module.exports = {
    output: {
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts!angular2-template'
        }, {
            test: /\.(html|css)$/,
            loader: 'raw-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'source-map',
};