import * as combiner from 'stream-combiner2';
import path          from 'path';
const $              = require('gulp-load-plugins')();

module.exports = (params) => {
  let isEntry = (file) => {
    return (params.env === 'production' && file.basename === 'app.js');
  }
  return () => {
    return combiner.obj(
      params.gulp.src(params.paths.appFilesPaths)
        .on('data', (file) => { file.cwd = './server' })
      , $.if(isEntry, $.rename(path => { path.basename = 'index' }))
      , $.babel()
      , $.debug({ title: '[Gulp-Debug]::', minimal: true })
      , params.gulp.dest(file => {
        return (path.relative(file.dirname, file.cwd) == '') ?
          params.paths.appDist : path.resolve(params.paths.appDist, path.relative(file.cwd, file.base))
      })
    )
      .on('error', () => {
        $.notify.onError(err => ({
          MainTitle: 'Error during SERVER COMPILING pipeline',
          ErrorMsg: err.message,
          FullError: JSON.stringify(err)
        }))
      });
  }
}
