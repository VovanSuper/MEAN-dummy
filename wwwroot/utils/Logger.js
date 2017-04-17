'use strict';

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = null;

module.exports = function (app) {
  if (!Logger) {
    Logger = _bunyan2.default.createLogger({
      name: 'EventsMan'
    });
  }
  return Logger;
};