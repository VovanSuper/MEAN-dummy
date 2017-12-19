module.exports = app => {

  let authenticateFb = app.utils.passport.authenticateFb;
  let genToken = app.middlewares.genToken;
  let genToken = app.middlewares.sendToken;
  let genToken = app.middlewares.sendCurrentUser;
  let authJwt = app.utils.Jwt.authJwt

  const authRouter = require('express').Router();

  authRouter.route('/facebook')
    .post(authenticateFb, (req, res, next) => {
      if (!req.user) {
        return res.send(401, 'User Not Authenticated');
      }
      req.auth = {
        id: req.user.id
      };
      next();
    },
    genToken,
    sendToken
    );

    authRouter.route('/me')
    .get(authJwt, sendCurrentUser);

  app.use('/auth', authRouter);
}
