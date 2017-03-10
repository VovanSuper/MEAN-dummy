'use strict';

let gulp  = require('gulp'),
  gutil   = require('gulp-util'),
  path    = require('path'),
  nodemon = require('gulp-nodemon'),
  del     = require('del'),
  webpack = require('webpack-stream'),
  babel   = require('babel-register'),
  mocha   = require('gulp-mocha'),
  gulpEnv = require('gulp-env'),
  chalk   = require('chalk'),
  spawn   = require('child_process').spawn,
  log     = console.log,
  bunyan;

gulp.task('bundle', function () {
  var env = gutil.env.type || 'dev',
    webpackfile = (env === 'prod') ? './webpack.config.js' : './webpack.config.dev.js';

  log(chalk.bgWhite.black.bold('Bundling for ' + env));
  log(chalk.bgWhite.green.bold('Using ' + path.basename(webpackfile)));

  return gulp.src(path.join(__dirname, 'client/main.ts'))
    .pipe(webpack(require(webpackfile)))
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('cp:static', function () {
  return gulp.src(['./client/index.html', './client/favicon.ico'])
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('clean', function (cb) {
  del(['./dist/**']);
  return cb();
});


gulp.task('tests:w', function () {
  gulpEnv.set({
    NODE_ENV: 'test',
    ENV: 'test'
  });
  gulp.watch('tests/**/*.spec.js')
    .on('change', function (file) {
      gulp.src(file.path)
        .pipe(mocha({
          reporter: 'nyan'
        }));
    });
});

gulp.task('tests', function () {
  gulpEnv.set({
    NODE_ENV: 'test',
    ENV: 'test'
  });
  gulp.src('tests/**/*.spec.js', {
    read: false
  })
    .pipe(mocha({
      reporter: 'nyan',
      compilers: {
        js: babel
      }
    }));
});

gulp.task('nodemon', ['cp:static', 'bundle'], function () {
  var stream = nodemon({
    exec: 'babel-node',
    watch: ['app.js', 'gulpfile.js', 'boot.js', 'db.js', './routes', './models', './libs', './utils', './client'],
    script: 'app',
    ext: 'js html css',
    ignore: ['./node_modules', './mongod', './data', './dist']
  })
    .on('readable', function () {
      // free memory 
      bunyan && bunyan.kill();
      bunyan = spawn('./node_modules/bunyan/bin/bunyan', [
        '--output', 'short',
        '--color'
      ]); // this is where we going to make the best call out
      bunyan.stdout.pipe(process.stdout);
      bunyan.stderr.pipe(process.stderr);

      this.stdout.pipe(bunyan.stdin);
      this.stderr.pipe(bunyan.stdin);
    })
    .on('restart', function () {
      log(chalk.bgGreen.red.bold('Restarting by server'));
    })
    .on('start', function () {
      log(chalk.bgGreen.black.bold('Starting server'));
    })
    .on('crash', function () {
      log(chalk.bgRed.black.bold('Crached... restatring'));
      stream.emit('restart', 100);
    });
});

gulp.task('default', ['clean', 'nodemon']);
