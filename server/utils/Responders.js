

module.exports = (app) => {
  return (params) => {
    let Ok = (req, resp) => {
      return resp.status(params.status).json({
        operationStatus: params.opStatus,
        items: params.items
      })
    }
    let Error = (req, resp) => {
      return resp.status(params.status).json({
        operationStatus: params.opStatus,
        error: params.err
      })
    }

    return {
      Ok: Ok,
      Error: Error
    }
  }
}