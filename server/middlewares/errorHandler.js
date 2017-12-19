module.exports = app => (err, req, resp, next) => {
  if (req.xhr) {
    return resp.status(500).json({
      status: 'Error',
      error: err.stack || err.message || err
    })
  } else {
    return resp.status(500).send(`<center><pre> ${err.stack || err.message || err} </pre></center`)
  }
}
