'use strict';
const webpack = require('webpack'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  WebpackMd5Hash = require('webpack-md5-hash'),
  InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin'),
  path = require('path');

module.exports = {

  output: {
    filename: '[name].[chunkhash].js'
    , sourceMapFilename: '[name].[chunkhash].map'
  },
  progress: true,
  watch: true,
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        loader: 'tslint-loader'
      }
    ],

    tslint: {
      emitErrors: true,
      failOnHint: false
    },

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
      loader: 'raw',
      include: [
        path.resolve(__dirname, 'client', 'app')
      ]
    }]
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      //names: ['polyfills', 'vendor'],
      children: true, 
      async: true,
      minChunks: 2,
      minSize: 256
    }),
    new htmlWebpackPlugin({
      cache: true,
      hash: false,
      inject: 'body',
      template: './client/index.html',
      favicon: './client/favicon.ico',
      xhtml: true,
      minify: false
    }),
    new InlineChunkManifestHtmlWebpackPlugin(),
    new scriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({
      "$": "jQuery",
      "jQuery": "JQuery",
      "jquery": "JQuery",
      "toastr": "toastr"
    })
  ]
};
