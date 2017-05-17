import bunyan from 'bunyan';

let Logger = null;

module.exports = app => {
  if (!Logger) {
    Logger = bunyan.createLogger({
      name: 'EventsMan'
    });
  }
  return Logger;
};