'use strict';

module.exports = function (app) {
  app.get('/', function (req, resp) {
    resp.status(200).sendFile(app.basePath, 'dist/index.html');
  });
};