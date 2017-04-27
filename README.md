# MEAN-dummy sample project

[![Build status](https://ci.appveyor.com/api/projects/status/77owkcg4w5vfr552/branch/master?svg=true&retina=true)](https://ci.appveyor.com/project/vladimir-ovsyukov/mean-dummy-b3k2e/branch/master)
[![Build Status](https://travis-ci.org/VovanSuper/MEAN-dummy.svg?branch=master)](https://travis-ci.org/VovanSuper/MEAN-dummy)



### A dummy (a very basic) MEAN (MongoDB, Express4, @Angular(2), Node.js) project 

by Vladimir Ovsyukov <<vovansuper@mail.ru>>

Software Stack used: 

* [MongoDB](https://www.mongodb.com/)
* [Angular](http://angular.io)
* [Express.js](http://expressjs.com)
* [Node.js](http://nodejs.org)
* [Typescript](http://www.typescriptlang.org/)
* [ECMA2015](http://www.ecma-international.org/ecma-262/6.0/)
* [Gulp.js](http://gulpjs.com/)
* [webpack](http://webpack.github.io/)
* [Ng2-bootstrap](http://valor-software.com/ng2-bootstrap/)
* [MongooseJs](http://mongoosejs.com/)
* [BabelJs](http://babeljs.io/)

## Installation

To insall dependencies - base npm installation -- `npm i`

## Starting

Running the project - gulp default task -- `gulp`
It creates client project distribution and starts expressjs server serving the web api

```shell
  npm install && gulp
```


## Main idea

To build fullstack express/angular(2) app with build system for client (Angular) application, ES6 based server application; 
This is a simple demonstrator project - fully handmade (i.e, no CLIs/generators used) MEAN project with Web apis' exposed for
handmade client app consuming the web api. Build system consists in gulp tasks utilizing webpack and several loaders
for building of the client angular 2 app; Server is a simple express app with es6 modules loaded using `consign` library; the server code is transpiled into es5-moduled code into `wwwroot` by babel or could be used directly from the root by means of `babel-node`.
To start building process `gulp` (or `npm start` to make production build) command (should have all npm packages intalled); after build complets - `index.html` and  app bundle are created in `dist` directory; 
web api server serving on port 8080;

##### Redistribution

**MIT**
*Copyright (c) 2017 Vladimir Ovsyukov <<vovansuper@mail.ru>> -- with link required to original sources point*
