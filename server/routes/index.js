import config from 'config';
import path from 'path';

module.exports = app => {

  app.get('/', (req, resp) => {
    resp.status(200).sendFile(path.join(app.rootPath, config.get('paths.indexPath')));
  });
}