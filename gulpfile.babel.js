require('babel-register')();

const gulp     = require('gulp'),
  memoryCache  = require('gulp-memory-cache'),
  path         = require('path'),
  { env, log } = require('./tasks/helpers/functions');

let root       = __dirname;
let paths      = require('./tasks/helpers/paths')(root);
let defineTask = require('./tasks/helpers/defineTask')(gulp, root);

defineTask('client:clean', 'cleanClient', { clientDist: paths.clientDist });
defineTask('appdist:clean', 'cleanDist', { appDist: paths.appDist });
defineTask('env:prod', 'setEnv', { type: 'production' });
defineTask('env:dev', 'setEnv', { type: 'development' });
defineTask('env:test', 'setEnv', { type: 'test' });
defineTask('tests', 'tests', { testsSrc: paths.testsSrc, webpackfile: paths.webpackfile });
defineTask('nodemon', 'nodemon');
defineTask('client:bundle', 'bundleClient', { paths: paths, env: env });
defineTask('server:compile', 'compileServer', { paths: paths, env: env });

gulp.task('tests:watch', () => {
  gulp.watch(paths.testsSrc, gulp.series('env:test', 'tests'))
    .on('change', () => { memoryCache.update('testsCache') })
});

gulp.task('compileBundle:prod', gulp.series(        
  'appdist:clean',                                  
  'env:prod',
  gulp.parallel('server:compile', 'client:bundle'))
);


gulp.task('default', gulp.series('client:clean', 'env:dev', 'client:bundle', 'nodemon'));
