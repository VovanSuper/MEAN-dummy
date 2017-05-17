require('babel-register');

const gulp = require('gulp'),
  path = require('path'),
  { env, log } = require('./tasks/helpers/functions');

let root = __dirname;
let paths = require('./tasks/helpers/paths')(root, env);
const defineTask = require('./tasks/helpers/defineTask')(gulp, root);

defineTask('client:bundle', 'bundleClient', { paths: paths, env: env });
defineTask('client:clean', 'cleanClient', { clientDist: paths.clientDist });
defineTask('appdist:clean', 'cleanDist', { appDist: paths.appDist });
defineTask('env:dev', 'setEnv', { type: 'development' });
defineTask('env:test', 'setEnv', { type: 'test' });
defineTask('tests:w', 'testsWatch', { testsSrc: paths.testsSrc });
defineTask('nodemon', 'nodemon');
defineTask('env:prod', 'setEnv', { type: 'production' });
defineTask('server:compile', 'compileServer', {
  appFilesPaths: paths.appFilesPaths,
  appDist: paths.appDist,
  root: root
});

gulp.task('compileBundle:prod', gulp.series(        // gulp --type=production compileBundle:prod
  'client:clean',                                   // TODO: set up angular PROD compilation
  'appdist:clean',
  'env:prod',
  gulp.parallel('server:compile', 'client:bundle'))
);


gulp.task('default', gulp.series('appdist:clean', 'env:dev', 'client:bundle', 'nodemon'));