import path                from 'path';
import chalk               from 'chalk';
import { log, wpReporter } from './helpers/functions';

const $                    = require('gulp-load-plugins')({
  pattern: [ 'gulp-*', 'vinyl-named', 'webpack-stream', 'stream-combiner2' ]
});

let isProd = process.env.NODE_ENV === 'production';

module.exports = (params) => {
  return (callback) => {
    log(chalk.bgWhite.black.italic('Bundling for ' + params.env));
    log(chalk.bgWhite.green.bold('Using ' + path.basename(params.paths.webpackfile)));
    return $.streamCombiner2.obj(
      params.gulp.src([
        path.join(params.paths.clientSrc, 'polyfills.ts'),
        path.join(params.paths.clientSrc, 'vendor.ts'),
        path.join(params.paths.clientSrc, 'main.ts')
      ], { since: !isProd ? $.memoryCache.lastMtime('bundleClient') : null })
      , $.vinylNamed()
      , $.if(!isProd, $.memoryCache('bundleClient'))
      , $.webpackStream(require(params.paths.webpackfile), require('webpack'), wpReporter)
      , params.gulp.dest(params.paths.clientDist)
        .on('data', () => {
          setTimeout(() => {   //TODO: improve!! now is quite a durty hack to continue gulp.series pipeline ex
            callback();
          }, 1500);
        })
    )
      .on('error', () => {
        if (!isProd) $.memoryCache.flush('bundleClient');
        $.notify.onError(err => ({
          MainTitle: 'Error during CLIENT BUNDLING pipeline',
          ErrorMsg: err.message,
          FullError: JSON.stringify(err)
        }))
      })
      .on('change', () => { if (!isProd) $.memoryCache.update('bundleClient') });
  }
}