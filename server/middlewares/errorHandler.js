module.exports = app => (err, req, resp, next) => {
  return resp.status(500).json({
    status: 'Error',
    error: err.stack || err.message || err
  });
}
