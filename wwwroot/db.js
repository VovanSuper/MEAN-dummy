'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;

module.exports = function (app) {
  if (!db) {
    var conf = {
      host: process.env.ENV === 'test' ? 'mongodb://localhost:27017/test' : _config2.default.get('database.host'),
      creds: process.env.ENV === 'test' ? null : _config2.default.get('database.creds')
    };
    _mongoose2.default.Promise = require('bluebird');
    _mongoose2.default.connect(conf.host);
    db = {
      mongoose: _mongoose2.default,
      connection: _mongoose2.default.connection,
      models: {}
    };

    var modelsDir = _path2.default.join(app.basePath, 'models');
    _fs2.default.readdirSync(modelsDir).forEach(function (fileName) {
      var filePath = _path2.default.join(modelsDir, fileName);
      var modelName = fileName.slice(0, fileName.indexOf('.'));
      db.models[modelName] = require(filePath)(_mongoose2.default);
    });
  }
  return db;
};