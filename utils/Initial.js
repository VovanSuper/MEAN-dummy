import express         from 'express';
import * as bodyParser from 'body-parser';
import cors            from 'cors';
import favicon         from 'serve-favicon';
import path            from 'path';
import config          from 'config';
let log = console.log;

module.exports = app => {
  app.basePath = process.cwd();
  app.set('port', config.get('base.port') || 8080)
    .use(favicon(path.join(app.basePath, 'dist/favicon.ico')))
    .use(express.static(path.join(app.basePath, 'dist')))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use((req, resp, next) => {
      if(req.body.id) delete req.body.id;
      log('Request:  ' + req.method + ' ' + req.url );
      console.dir(req.body);
      next();
    });
}