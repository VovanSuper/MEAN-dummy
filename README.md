<img src="https://raw.githubusercontent.com/VovanSuper/MEAN-dummy/master/client/favicon.ico" align="right" />

# MEAN-dummy sample project

[![Build status](https://ci.appveyor.com/api/projects/status/77owkcg4w5vfr552/branch/master?svg=true&retina=true)](https://ci.appveyor.com/project/vladimir-ovsyukov/mean-dummy-b3k2e/branch/master)
[![Build Status](https://travis-ci.org/VovanSuper/MEAN-dummy.svg?branch=master)](https://travis-ci.org/VovanSuper/MEAN-dummy)



### A dummy (a very basic) MEAN (MongoDB, Express4, @Angular(2), Node.js) project 


Software Stack used: 

* [MongoDB](https://www.mongodb.com/)
* [Angular](http://angular.io)
* [Express.js](http://expressjs.com)
* [Node.js](http://nodejs.org)
* [Typescript](http://www.typescriptlang.org/)
* [ECMA2015](http://www.ecma-international.org/ecma-262/6.0/)
* [Gulp.js](http://gulpjs.com/)
* [webpack](http://webpack.github.io/)
* [MongooseJs](http://mongoosejs.com/)
* [BabelJs](http://babeljs.io/)

## Installation

To install dependencies - base npm installation -- `npm i`.

## Starting

Running the project -- `npm start` (or directly run gulp default task -- `gulp`, with, preferably, setting *NODE_ENV*, *PORT* etc )
It creates client project distribution and starts express server serving the web api (will bundle client and compile server code into `./wwwroot` dir):

```shell
  npm install && npm start
```

## Development mode

The *dev* mode is run by -- `npm run start:dev`; it'll set *NODE_ENV* to *development* bundle client app (into `wwwroot/dist` dir including assets due to webpack' loaders rules ) and, once client is bundled successfully, start *nodemon* task (starts nodemon with babel-node against code in `./server`).

## Main idea

To build full-stack express/angular(2) app with build system for client (Angular) application, ES6 based server application (aka another simple seed proj); 
This is a simple demonstrator project - fully handmade (i.e, no CLIs/generators used) MEAN project with Web apis' exposed for
handmade client app consuming the web api. Build system consists in gulp tasks utilizing webpack and several loaders
for building of the client angular 2 app; Server is a simple express app with es6 modules loaded using `consign` lib; the server code is transpiled into es5-moduled code into `wwwroot` by babel or could be used directly from the root by means of `babel-node`.
To start building process `gulp` (or `npm start` to make production build) command (should have all npm packages installed); after build completes - `index.html` and  app bundle are created in `dist` directory; 
web api server serving on port 8080 (could be reset by the start).

##### Redistribution

**MIT**
*Copyright (c) Vladimir Ovsyukov <<ovsyukov@yandex.com>> -- with link required to original sources point*
