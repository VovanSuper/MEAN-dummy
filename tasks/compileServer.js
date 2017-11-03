import * as str  from 'stream-combiner2';
import path from 'path';
const $     = require('gulp-load-plugins')();

const isEntry = (file) => {
  return file.basename === 'app.js'
}

module.exports = (params) => (callback) => {
  return str.obj(
    params.gulp.src([...params.paths.appFilesPaths])
      .on('data', (file) => { file.cwd = './server' })
    , $.if((params.env === 'production' && isEntry), $.rename(path => { path.basename = 'index' }))
    , $.babel()
    , $.debug({ title: '[Gulp-Debug]::', minimal: true })
    , params.gulp.dest(file => {
      return (path.relative(file.dirname, file.cwd) == '') ?
        params.paths.appDist : path.resolve(params.paths.appDist, path.relative(file.cwd, file.base))
    })
      .on('finish', () => {
        callback();
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
