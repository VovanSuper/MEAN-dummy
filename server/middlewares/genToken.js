module.exports = app => (req, res, next) => {
  let jwtEncode = app.utils.Jwt.jwtEncode;

  req.token = jwtEncode(req.auth);
  next();
};
