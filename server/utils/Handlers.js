module.exports = app => {
  const okHandler = (resp, code, data, opStatus) => {
    return resp.status(code).json({
      operationStatus: opStatus,
      data: data
    });
  }
  const failHandler = (resp, code, err, opStatus) => {
      return resp.status(code).json({
        operationStatus: opStatus,
        err: err
      });
    }

  return {
    Ok: okHandler,
    Error: failHandler
  }
}