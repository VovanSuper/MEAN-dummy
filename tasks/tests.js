const $ = require('gulp-load-plugins')();

module.exports = (params) => {
  return () => {
    return params.gulp.src(params.testsSrc, { read: false, since: $.memoryCache.lastMtime('tests') })
      .pipe($.memoryCache('tests'))
      .pipe($.mocha({
        reporter: 'nyan',
        compilers: {
          js: $.babel
        }
      }))
      .on('change', () => {
        $.memoryCache.update('tests');
      });
  }
}