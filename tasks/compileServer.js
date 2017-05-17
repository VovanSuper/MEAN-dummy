import * as combiner from 'stream-combiner2';
import path from 'path';
const $ = require('gulp-load-plugins')();

module.exports = (params) => {
  return () => {
    return combiner.obj(
       params.gulp.src(params.appFilesPaths)
        .on('data', (file) => { console.log(`Compiling ${file.basename}` )})
      , $.babel()
      , $.debug({ title: '[Gulp-Debug]::', minimal: true })
      , params.gulp.dest((file) => {
          return (path.relative(file.dirname, file.cwd) == '') ?
            'wwwroot' : path.resolve('wwwroot', path.relative(file.cwd, file.base))  
      })
    )
      .on('error', $.notify.onError((err) => {
        return {
          MainTitle: 'Error during pipeline',
          ErrorMsg: err.message,
          FullError: JSON.stringify(err)
        }
      }));
  }
}
