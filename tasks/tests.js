const $               = require('gulp-load-plugins')();
import path           from 'path';
import webpackStream  from 'webpack-stream';
import { wpReporter } from './helpers/functions'

// let isClientTest = (file) => {
//   let relTestPaths = path.relative(file.base, file.path);
//   let resolevedTestTypeDir = (relTestPaths.split(/(\\|\/)/)[0]).trim();
//   return resolevedTestTypeDir === 'client-code';
// };

module.exports = (params) => {
  return (cb) => {
    return params.gulp.src(params.testsSrc, { read: false, since: $.memoryCache.lastMtime('testsCache') })
    //  .pipe($.if(isClientTest, webpackStream(require(params.webpackfile), require('webpack'), wpReporter)))
      .pipe($.memoryCache('testsCache'))
      .pipe($.mocha({
        reporter: 'nyan',
        compilers: { js: $.babel }
      }))
      .on('change', () => $.memoryCache.update('testsCache'))
      .once('end', () => { cb(); process.exit(0) })
  }
}
