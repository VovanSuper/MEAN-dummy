module.exports = app => {
  app
    .get('/', app.middlewares.indexHandler)
    // .get(['/events/all', '/users/all'], (req, resp, next) => {
    //   if (!req.xhr)
    //     return app.middlewares.indexHandler(req.resp, next);

    //   next();
    // })
}