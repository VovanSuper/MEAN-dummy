module.exports = app => {
  app.get('/', (req, resp) => {
    resp.status(200).sendFile(app.basePath, 'dist/index.html');
  })
}