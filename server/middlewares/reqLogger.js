module.exports = app => (req, resp, next) => {
  if (req.body.id) delete req.body.id;

  app.locals.Logger.info(` ${req.method}  ${req.protocol}://${req.hostname}${req.url}`);
  if (req.method === ('POST' || 'PUT' || 'PATCH'))
    app.locals.Logger.info('Body : ' + JSON.stringify(req.body));

  return next();
}
