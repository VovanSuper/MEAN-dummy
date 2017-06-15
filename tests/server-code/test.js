#!/usr/bin/env node
require('babel-register')({ presets: ['es2015'] });

let path = require('path'),
  dbjs = require(path.resolve(__dirname, '..', 'server', 'db.js')),
  log = console.log;

var app = {
  basePath: path.resolve(__dirname, '..', 'server')
};

let db = dbjs(app);

db.connection.on('open', () => {
  log('Connected to mlab...');

  for (let m in db.models) {
    log('>>  MODEL : ' + m);
    log('\t\t model name : ' + db.models[m].modelName);
    log('----------------------------------------------------');

    Object.getOwnPropertyNames(db.models[m]).forEach(prop => {
      log('\t prop : ' + prop);
    })
  }

  db.models['Events'].findOne({
    name: 'patched again'
  })
    .populate('users')
    .exec((err, u) => {
      if (err) return log(err);
      log(u)
    });
});

let mongoose = require('mongoose');
let schema = mongoose.Schema({
  name: String
})
