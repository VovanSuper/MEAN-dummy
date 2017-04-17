module.exports = app => {
  app.db.mongoose.connection
    .on('error', (err) =>  { 
      app.utils.Logger.error(err) 
    })
    .on('open', () => {
      console.log(`Mongo connected to mongoDb on port: ${app.db.mongoose.connection.port}`)
      app.listen(app.get('port'), () => app.utils.Logger.info(`Listening on port ${app.get('port')}`));
    });
}
