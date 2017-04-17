'use strict';

module.exports = function (app) {
  app.db.mongoose.connection.on('error', function (err) {
    app.utils.Logger.error(err);
  }).on('open', function () {
    console.log('Mongo connected to mongoDb on port: ' + app.db.mongoose.connection.port);
    app.listen(app.get('port'), function () {
      return app.utils.Logger.info('Listening on port ' + app.get('port'));
    });
  });
};