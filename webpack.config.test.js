'use strict';
const webpack = require('webpack'),
  path = require('path'),
  htmlWebpackPlugin = require('html-webpack-plugin');
  //,scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: './client/main.ts',

  output: {
    filename: '[name].bundle.js',
    //path: './dist',
    //publicPath: './dist',
    sourceMapFilename: '[name].bundle.map'
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [{
      test: /\.component\.ts$/,
      loader: 'ts!angular2-template',
      include: [
        path.resolve(__dirname, 'client', 'app')
      ]
    },
    {
      test: /\.ts$/,
      loader: 'ts',
      exclude: /\.component\.ts/,
      include: [
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, 'node_modules')
      ],
    },
    {
      test: /\.css$/,
      loader: 'null'
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'null'
    },
    {
      test: /\.html$/,
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
    })
  ]
};