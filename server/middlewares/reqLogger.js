import bunyan from 'bunyan';
import path from 'path';

module.exports = app => {
  app.Logger = app.Logger || bunyan.createLogger({
    name: 'EventsMan',
    level: 'info'
  });

  return (req, resp, next) => {
    if (req.body.id) delete req.body.id;

    app.Logger.info(` ${req.method}  ${req.protocol}://${req.hostname}${req.url}`);
    if (req.method === ('POST' || 'PUT' || 'PATCH'))
      app.Logger.info('Body : ' + JSON.stringify(req.body));

    next();
  }
}
