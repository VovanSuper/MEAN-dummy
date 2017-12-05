module.exports = app => (req, res, next) => {
  console.log("[isAuthHadler]:: is AUTH?", req.isAuthenticated());
  if (!req.isAuthenticated())
    return res.status(401).json({ error: 'User is not authorized at all' });

  next();
};