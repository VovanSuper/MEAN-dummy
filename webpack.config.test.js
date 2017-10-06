'use strict';
const webpack = require('webpack'),
  path = require('path'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  config = require('config');
// ,scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  // entry: './client/main.ts'

  output: {
    filename: '[name].bundle.js'
    // , sourceMapFilename: '[name].bundle.map'
    // , path: './dist',
    // , publicPath: './dist',
  },
  devtool: 'cheap-module-inline-source-map',
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
      exclude: /\.component\.ts/,
      include: [
        path.resolve(__dirname, 'client')
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
    // new htmlWebpackPlugin({
    //   cache: false,
    //   hash: false,
    //   favicon: './client/favicon.ico',
    //   xhtml: true,
    //   template: './client/index.html'
    // }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify('test'),
        host: JSON.stringify(`//${process.env.HOST || 'localhost'}}`),
        port: JSON.stringify(8080)
      }
    }),
  ]
};