const $ = require('gulp-load-plugins')();

module.exports = (params) => {
  return (cb) => {
    return params.gulp.src(params.testsSrc, { read: false, since: $.memoryCache.lastMtime('testsCache') })
      .pipe($.memoryCache('testsCache'))
      .pipe($.mocha({
        reporter: 'nyan',
        compilers: { js: $.babel }
      }))
      .on('end', () => { cb(); process.exit(0) });
  }
}
