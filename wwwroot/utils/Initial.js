'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log;

module.exports = function (app) {
  app.basePath = _path2.default.resolve(__dirname, '..');

  app.set('port', process.env.PORT || _config2.default.get('base.port')).use((0, _serveFavicon2.default)(_path2.default.join(app.basePath, 'dist/favicon.ico'))).use(_express2.default.static(_path2.default.join(app.basePath, 'dist'))).use((0, _cors2.default)()).use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false })).use(function (req, resp, next) {
    if (req.body.id) delete req.body.id;
    log('Requested :  ' + req.method + ' - ' + req.url);
    console.dir(req.body);
    next();
  });
};