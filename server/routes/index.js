module.exports = app => {
  app.get('/', (req, resp) => {
    resp.status(200).sendFile(app.rootPath, 'wwwroot/dist/index.html');
  })
}