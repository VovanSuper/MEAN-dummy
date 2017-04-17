'use strict';

var webpack = require('webpack'),
  path = require('path'),
  fileCopyPlugin = require('copy-webpack-plugin');
var appFilesPaths = ['./app.js', './utils/**/*.js', './routes/**/*.js', './db.js', './boot.js', './models/**/*.js'];

module.exports = {
  context: __dirname,
  output: {
    // path: 'wwwroot',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        target: 'node',
        test: /\.js$/,
        exclude: /(node_modules|dist|app|client|config|tests)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new fileCopyPlugin([
      {
        from: path.join(__dirname, 'utils/**/*.js'),
        toType: 'dir'
      },
      {
        from: path.join(__dirname, 'routes/**/*.js'),
        toType: 'dir'
      },
      {
        from: path.join(__dirname, 'models/**/*.js'),
        toType: 'dir'
      }
    ])
  ],
  resolve: {
    extensions: ['', '.js']
  }
};
