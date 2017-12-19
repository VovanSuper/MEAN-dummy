const webpack = require('webpack'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  WebpackMd5Hash = require('webpack-md5-hash'),
  InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin'),
  path = require('path'),
  config = require('config');

module.exports = {

  output: {
    filename: '[name].[hash].js'
    , sourceMapFilename: '[name].[hash].map'
    , chunkFilename: '[id].[name].bundle.[chunkhash].js'
  },
  progress: true,
  watch: true,
  devtool: 'source-map',
  module: {
    // preLoaders: [
    //   {
    //     test: /\.ts$/,
    //     include: [
    //       path.resolve(__dirname, 'client')
    //     ],
    //     loader: 'tslint-loader'
    //   }
    // ],

    // tslint: {
    //   emitErrors: true,
    //   failOnHint: false
    // },

    loaders: [{
      test: /\.ts$/,
      loader: 'awesome-typescript!angular2-template',
      include: [
        path.join(__dirname, 'client')
      ]
    },
<<<<<<< HEAD
=======
    // {
    //   test: /\.ts$/,
    //   loader: 'awesome-typescript',
    //   include: [
    //     path.join(__dirname, 'client')
    //   ],
    //   exclude: /\.component\.ts$/
    // },
    // {
    //   test: /routes\.ts/,
    //   loader: 'awesome-typescript!angular2-router',
    //   include: [
    //     path.resolve(__dirname, 'client', 'app')
    //   ]
    // },
    // {
    //   test: /styles\.css$/,
    //   loader: 'file?name=[name].[ext]',
    //   include: [
    //     path.join(__dirname, 'client')
    //   ],
    //   exclude: [
    //     path.join(__dirname, 'client', 'app')
    //   ]
    // },
>>>>>>> dev
    {
      test: /\.(html|css)$/,
      loader: 'raw',
      include: [
        path.join(__dirname, 'client', 'app')
      ]
<<<<<<< HEAD
    },
    {
      test: /styles\.css$/,
      loader: 'file?name=[name].[ext]',
      include: [
        path.join(__dirname, 'client')
      ],
      exlude: [
        path.join(__dirname, 'client', 'app')
      ]
=======
>>>>>>> dev
    }

    // , {
    //   test: /routes\.ts/,
    //   loader: 'awesome-typescript!angular2-router',
    //   include: [
    //     path.resolve(__dirname, 'client', 'app')
    //   ]
    // },
 
    ]
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['polyfills', 'vendor'],
      children: true,
      async: true,
      minChunks: 2,
      minSize: 256
    }),
    new htmlWebpackPlugin({
      cache: true,
<<<<<<< HEAD
      hash: false,
      inject: 'head',
      template: './client/index.ejs',
=======
      hash: true,
      inject: 'body',
      template: '!!ejs?name=[name].[ext]!./client/index.ejs',
>>>>>>> dev
      favicon: './client/favicon.ico',
      xhtml: true,
      // showErrors: true,
      minify: false,
      title: config.get('base.headOptions.title'),
      opts: config.get('base.headOptions')
    }),
    new InlineChunkManifestHtmlWebpackPlugin(),
    new scriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify('development'),
        host: JSON.stringify(`//${process.env.HOST || 'localhost'}`),
        port: `${process.env.PORT || 8080}`
      }
    }),
    new webpack.ProvidePlugin({
      "$"     : "jQuery",
      "jquery": "JQuery",
      "toastr": "toastr"
    })
  ]
}