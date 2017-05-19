import path                from 'path';
import webpackStream       from 'webpack-stream';
import chalk               from 'chalk';
import named               from 'vinyl-named';
import { log, wpReporter } from './helpers/functions';

module.exports = (params) => {
  return (callback) => {
    log(chalk.bgWhite.black.italic('Bundling for ' + params.env));
    log(chalk.bgWhite.green.bold('Using ' + path.basename(params.paths.webpackfile)));
    return params.gulp.src([
      path.join(params.paths.clientSrc, 'polyfills.ts'),
      path.join(params.paths.clientSrc, 'main.ts')
    ])
      .pipe(named())
      .pipe(webpackStream(require(params.paths.webpackfile), null, wpReporter))
      .pipe(params.gulp.dest(params.paths.clientDist))
      .on('end', callback); 
  }
}