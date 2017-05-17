import express from 'express';
import consign from 'consign';

let app = express();

consign({ cwd: __dirname })
  .include('utils')
  .then('db.js')
  .then('routes')
  .then('boot.js')
  .into(app);

module.exports = app;