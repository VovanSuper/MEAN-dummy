import * as bunyan from 'bunyan';

let Logger = null;

module.exports = app => {
  if (!Logger) {
    Logger = bunyan.createLogger({
      name: 'EventsMan'
    });
  }
  app.basePath = process.cwd();
  app.Logger = Logger;

};