import config from 'config';
import path   from 'path';
import fs     from 'fs';

module.exports = app => (req, resp, next) => {
  let distPath = path.join(app.rootPath, config.get('paths.indexPath'));

  fs.exists(distPath, (exists) => {
    if (!exists)
      return next(new Error('Compile/bundle the Angular app first to dist folder'));

    return fs.createReadStream(path.join(distPath, 'index.html'), { autoClose: true, encoding: 'utf-8' })
      .pipe(resp);
  });
}