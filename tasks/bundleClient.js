import path                from 'path';
import chalk               from 'chalk';
import { log, wpReporter } from './helpers/functions';

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'vinyl-named', 'webpack-stream', 'stream-combiner2']
});

module.exports = (params) => {
  return (callback) => {
    log(chalk.bgWhite.black.italic('Bundling for ' + params.env));
    log(chalk.bgWhite.green.bold('Using ' + path.basename(params.paths.webpackfile)));
    return $.streamCombiner2.obj(
      params.gulp.src([
        path.join(params.paths.clientSrc, 'polyfills.ts'),
        path.join(params.paths.clientSrc, 'main.ts')
      ], { since: $.memoryCache.lastMtime('client') })
      , $.vinylNamed()
      , $.if( process.env.NODE_ENV !== 'production', $.memoryCache('client'))
      , $.webpackStream(require(params.paths.webpackfile), null, wpReporter)
      , params.gulp.dest(params.paths.clientDist)
        .on('data', () => {
          setTimeout(() => {   //TODO: improve!! now is quite a durty hack to continue gulp.series pipeline ex
            callback();
          }, 1000);
        })
    )
      .on('error', () => {
        $.memoryCache.flush('client');
        $.notify.onError(err => ({
          MainTitle: 'Error during CLIENT BUNDLING pipeline',
          ErrorMsg: err.message,
          FullError: JSON.stringify(err)
        }))
      })
      .on('change', $.memoryCache.update('client')) ;
  }
}