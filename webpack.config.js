'use strict';
const webpack = require('webpack'),
  //closureCompilerPlugin = require('webpack-closure-compiler'),
  V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');


module.exports = {
  //entry: 'src/mail.ts',
  output: {
    // path: 'dist',
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
  plugins: [
  //   // new closureCompilerPlugin({
  //   //   compiler: {
  //   //     compilation_level: 'ADVANCED',
  //   //     debug: true
  //   //   },
  //   //   jsCompiler: true
  //   // })
    new V8LazyParseWebpackPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
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
