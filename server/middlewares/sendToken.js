module.exports = app => (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};