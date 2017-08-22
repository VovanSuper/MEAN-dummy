module.exports = app => {
  app.db.mongoose.connection
    .on('error', err => app.locals.Logger.error(err))
    .on('close', () => app.locals.Logger.info('Closing connection to mongoDb...'))
    .on('open', () => {
      app.locals.Logger.info(`Mongo connected to mongoDb on port: ${app.db.mongoose.connection.port}`)
      app.listen(app.get('port'), () => app.locals.Logger.info(`Listening on port ${app.get('port')}`));
    });
  process.on('SIGINT', arg => {
    app.db.mongoose.connection.close(() => {
      app.locals.Logger.error('Exiting!.. Closing connection to db...');
      process.emit('disconnect');
      process.emit('exit', 0);
    })
  });
}
