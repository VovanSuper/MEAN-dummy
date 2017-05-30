'use strict';
const webpack = require('webpack'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  WebpackMd5Hash = require('webpack-md5-hash'),
  path = require('path');

module.exports = {
  output: {
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map'
  },
  watch: true,
  progress: true,
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.component\.ts$/,
      loader: 'awesome-typescript!angular2-template',
      include: [
        path.resolve(__dirname, 'client', 'app')
      ]
    },
    {
      test: /\.ts$/,
      loader: 'awesome-typescript',
      include: [
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, 'node_modules')
      ],
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
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new htmlWebpackPlugin({
      cache: false,
      hash: false,
      favicon: './client/favicon.ico',
      xhtml: true,
      template: './client/index.html'
    }),
    new scriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify('development')
      }
    })
  ]
};