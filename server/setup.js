import express         from 'express';
import * as bodyParser from 'body-parser';
import cors            from 'cors';
import favicon         from 'serve-favicon';
import path            from 'path';
import config          from 'config';

module.exports = app => {
  app.set('port', process.env.PORT || config.get('base.port'))
    .use(favicon(path.join(app.locals.rootPath, config.get('paths.clientDist'), 'favicon.ico')))
    .use(express.static(path.join(app.locals.rootPath, config.get('paths.clientDist'))))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(app.middlewares.reqLogger)
}