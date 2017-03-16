'use strict';
const webpack = require('webpack'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {

  output: {
    filename: 'app.bundle.js',
    sourceMapFilename: 'app.bundle.map'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.component\.ts$/,
      loader: 'awesome-typescript!angular2-template'
    },
    {
      test: /\.ts$/,
      loader: 'awesome-typescript',
      exclude: /\.component\.ts$/
    },
    {
      test: /\.(html|css)$/,
      loader: 'raw-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
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