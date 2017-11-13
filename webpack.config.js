const webpack = require('webpack'),
  path = require('path'),
  V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin'),
  //ClosureCompilerPlugin = require('webpack-closure-compiler'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  config = require('config');

module.exports = {
  output: {
    // path: 'dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        loader: 'awesome-typescript!angular2-template'
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.ejs$/,
        include: [
          path.join(__dirname, 'client')
        ],
        loader: 'ejs'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  devtool: 'inline-source-map',
  plugins: [
    //new webpack.ContextReplacementPlugin(
    //  // The (\\|\/) piece accounts for path separators in *nix and Windows
    //  /angular(\\|\/)core(\\|\/)@angular/,
    //  helpers.root('./src'), // location of your src
    //  {} // a map of your routes
    //),
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
        except: ['$', 'webpackJsonp'],
        keep_fnames: true
      }
    }),
    new htmlWebpackPlugin({
      cache: false,
      hash: false,
      favicon: 'client/favicon.ico',
      xhtml: false,
      inject: 'body',
      template: 'client/index.ejs',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: false,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      opts: config.get('base.headOptions')

    }),
    new webpack.optimize.CommonsChunkPlugin({
      // names: [ 'polyfills', 'vendor', 'main' ],
      children: true,
      async: true,
      minChunks: 2,
      minSize: 256
    }),
    new scriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify('production'),
        host: JSON.stringify(`//${process.env.HOST || 'localhost'}`),
        port: `${process.env.PORT || 80}`
      }
    }),
    new webpack.ProvidePlugin({
      "$": "jQuery",
      "jquery": "JQuery",
      "toastr": "toastr"
    })
  ]
};
