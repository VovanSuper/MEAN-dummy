import express from 'express';
import consign from 'consign';

let app = express();

consign()
  .include('utils')
  .then('db.js')
  .then('routes')
  .then('boot.js')
  .into(app);

exports = module.exports = app;