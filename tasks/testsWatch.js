const $ = require('gulp-load-plugins')();

module.exports = (params) => {
  return () => {
    return params.gulp.watch(params.testsSrc, params.gulp.series('env:test', () => {
      params.gulp.src(params.testsSrc, { read: false, since: $.memoryCache.lastMtime('tests') })
        .pipe($.memoryCache('tests'))
        .pipe($.mocha({
          reporter: 'nyan',
          compilers: {
            js: $.babel
          }
        }))
    }))
      .on('change', (file) => {
        $.memoryCache.update('tests')
      });
  }
}

  // gulp.task('watch:tests', () => { gulp.watch(paths.testsSrc, 'tests') });

  // gulp.task('tests:w', gulp.series('env:test', 'watch:tests')