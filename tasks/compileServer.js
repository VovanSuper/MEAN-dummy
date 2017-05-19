import * as combiner from 'stream-combiner2';
import path from 'path';
const $ = require('gulp-load-plugins')();

module.exports = (params) => {
  let isEntry = (file) => {
    if (params.env === 'production' && file.basename === 'app.js')
      return true;
    return false
  }

  return (callback) => {
    return combiner.obj(
      params.gulp.src(params.appFilesPaths.map(item => path.join('./server', item)))
        .on('data', (file) => {
          file.cwd = './server';
          console.log(`Compiling ${file.basename}`)
        })
      , $.if(isEntry, $.rename(path => { path.basename = 'index' }))
      , $.babel()
      , $.debug({ title: '[Gulp-Debug]::', minimal: true })
      , params.gulp.dest(file => {
        return (path.relative(file.dirname, file.cwd) == '') ?
          'wwwroot' : path.resolve('wwwroot', path.relative(file.cwd, file.base))
      })
        .on('end', callback)
    )

      .on('error', $.notify.onError(err => {
        return JSON.stringify({
          MainTitle: 'Error during pipeline',
          ErrorMsg: err.message,
          FullError: JSON.stringify(err)
        });
      }));
  }
}
