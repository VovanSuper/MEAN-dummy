'use strict';
const webpack = require('webpack'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: './client/main.ts',

  output: {
    filename: '[name].bundle.js',
    path: './dist',
    //publicPath: './dist',
    sourceMapFilename: '[name].bundle.map'
  },
  devtool: '#sourcemap',
  module: {
    loaders: [{
      test: /\.component\.ts$/,
      loader: 'ts!angular2-template'
    },
    {
      test: /\.ts$/,
      loader: 'ts',
      exclude: /\.component\.ts/
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