import path    from 'path';
import express from 'express';
import consign from 'consign';

let app = express();
app.locals.basePath = __dirname;
app.locals.rootPath = process.cwd();

consign({ cwd: __dirname })
  .include('db.js')
  .then('utils')
  .then('middlewares')
  .then('setup.js')
  .then('routes')
  .then('boot.js')
  .into(app);

module.exports = app;
