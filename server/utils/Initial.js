import express         from 'express';
import * as bodyParser from 'body-parser';
import cors            from 'cors';
import favicon         from 'serve-favicon';
import path            from 'path';
import config          from 'config';
let log = console.log;

module.exports = app => {

  app.basePath = path.resolve(__dirname, '..');
  app.rootPath = process.cwd();

  app.set('port', process.env.PORT || config.get('base.port'))
    .use(favicon(path.join(app.rootPath, 'wwwroot/dist/favicon.ico')))
    .use(express.static(path.join(app.basePath, 'wwwroot/dist')))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use((req, resp, next) => {
      if (req.body.id) delete req.body.id;
      log(`Requested :  ${req.method} - ${req.url}` );
      next();
    });
}