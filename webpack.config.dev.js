'use strict';
const webpack = require('webpack'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map'
  },
  devtool: '#sourcemap',
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts!angular2-template',
      exclude: [/node_modules/]
    }, {
      test: /\.(html|css)$/,
      loader: 'raw-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: [
    new htmlWebpackPlugin({
      cache: false,
      hash: false,
      favicon: './client/favicon.ico',
      xhtml: true,
      template: './client/index.html'
    }),
    new scriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ]
};