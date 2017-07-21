module.exports = app => {
  app.db.mongoose.connection
    .on('error', err => app.Logger.error(err))
    .on('close', () => app.Logger.info('Closing connection to mongoDb...'))
    .on('open', () => {
      app.Logger.info(`Mongo connected to mongoDb on port: ${app.db.mongoose.connection.port}`)
      app.listen(app.get('port'), () => app.Logger.info(`Listening on port ${app.get('port')}`));
    });
  process.on('SIGINT', arg => {
    app.db.mongoose.connection.close(() => {
      app.Logger.error('Closed to db...');
      process.emit('disconnect');
    })
  });
}
