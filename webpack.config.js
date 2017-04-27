require('babel-register');

const webpack = require('webpack'),
  path = require('path'),
  V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin'),
  //ClosureCompilerPlugin = require('webpack-closure-compiler'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  output: {
    // path: 'dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.component\.ts$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        loader: 'awesome-typescript!angular2-template'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'node_modules')
        ],
        exclude: /\.component\.ts$/
      }, {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  devtool: 'source-map',
  plugins: [
    new htmlWebpackPlugin({
      cache: true,
      hash: true,
      favicon: 'client/favicon.ico',
      xhtml: true,
      template: 'client/index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        minifyCss: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new scriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new V8LazyParseWebpackPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new ClosureCompilerPlugin({
    //   compiler: {

    //     compilation_level: 'ADVANCED'
    //   },
    //   concurrency: 2,
    // })
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        screw_ie8: true,
        warnings: false,
        negate_iife: false
      },
      mangle: {
        screw_ie8: true,
        except: ['$', 'webpackJsonp']
      },
      output: {
        comments: false
      }
    })
  ]
};
