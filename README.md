# MEAN-dummy sample project

## A dummy (a very basic sample) MEAN (MongoDB, Express4, @Angular(2), Node.js) project 

by Vladimir Ovsyukov <vovansuper@mail.ru>


Stack used: 

  *[MongoDB](https://www.mongodb.com/)
  *[Angular](http://angular.io)
  *[Express.js](http://expressjs.com)
  *[Node.js](http://nodejs.org)
    *[Typescript](http://www.typescriptlang.org/)
    *[ECMA2015](http://www.ecma-international.org/ecma-262/6.0/)
    *[Gulp.js](http://gulpjs.com/)
    *[webpack](http://webpack.github.io/)
    *[Ng2-bootstrap](http://valor-software.com/ng2-bootstrap/)
    *[MongooseJs](http://mongoosejs.com/)
    *[BabelJs](http://babeljs.io/)


##Installation

To insall dependencies - base npm installation -- `npm i`


##Starting

Running the project - gulp default task -- `gulp`
It creates client project distribution and starts expressjs server serving the web api

```shell
  npm install && gulp
```


##Main idea

This is a simple demonstrator project - fully handmade (i.e, no CLIs/generators used) MEAN project with Web apis' exposed for
handmade client app consuming the web api. Build system consists in Gulp tasks utilizing webpack and typescript/angular2-templates loaders
for building of the app;

####Redistribution

MIT 
Copyright (c) 2017 Vladimir Ovsyukov<vovansuper@mail.ru> -- with link required to original sources point
