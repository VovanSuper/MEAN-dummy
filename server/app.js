import path    from 'path';
import express from 'express';
import consign from 'consign';
import bunyan  from 'bunyan';

let app = express();
app.locals.basePath = __dirname;
app.locals.rootPath = process.cwd();
app.locals.Logger = bunyan.createLogger({
  name: 'EventsMan',
  level: 'error'
});

consign({ cwd: __dirname })
  .include('db.js')
  .then('utils')
  .then('middlewares')
  .then('setup.js')
  .then('routes')
  .then('boot.js')
  .into(app);

module.exports = app;