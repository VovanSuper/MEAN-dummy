module.exports = app => (req, resp, next) => {
  User.findById(req.auth.id, (err, user) => {
    if (err) {
      return resp.status(401).json({
        operationStatus: 'Failed',
        err: `Error no user found ${req.auth.id}`
      })
    } else {
      return resp.status(200).json({
        operationStatus: 'Ok',
        data: user
      })
    }
  });
};