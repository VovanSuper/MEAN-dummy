import path from 'path';
import chalk from 'chalk';
import { log, wpReporter } from './helpers/functions';

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'vinyl-named', 'webpack-stream', 'stream-combiner2']
});

let isProd = process.env.NODE_ENV === 'production';

module.exports = (params) => (callback) => {
  log(chalk.bgWhite.black.italic('Bundling for ' + params.env));
  log(chalk.bgWhite.magenta.bold('Using ' + path.basename(params.paths.webpackfile)));

  return $.streamCombiner2.obj(
    params.gulp.src([
      path.join(params.paths.clientSrc, 'polyfills.ts'),
      path.join(params.paths.clientSrc, 'vendor.ts'),
      path.join(params.paths.clientSrc, 'main.ts')
    ]
      // , !isProd ? { since: $.memoryCache.lastMtime('bundleClient') } : {}
    )
    , $.vinylNamed()
    // , $.if(!isProd, $.memoryCache('bundleClient'))
    , $.webpackStream(require(params.paths.webpackfile), require('webpack'), wpReporter)
    , params.gulp.dest(params.paths.clientDist)
      .on('data', () => {
        setTimeout(callback, 1500)   //TODO: improve!! now is quite a durty hack to continue gulp.series pipeline exec
      })
      .on('finish', callback)
  )
  // .on('error', () => {
  //   if (!isProd) $.memoryCache.flush('bundleClient');
  //   $.notify.onError(err => ({
  //     MainTitle: 'Error during CLIENT BUNDLING pipeline',
  //     ErrorMsg: err.message,
  //     FullError: JSON.stringify(err)
  //   }));
  // })

  // .on('change', () => { if (!isProd) $.memoryCache.update('bundleClient') });
}
