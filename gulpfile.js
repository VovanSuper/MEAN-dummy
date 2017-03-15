'use strict';

let gulp  = require('gulp'),
  gutil   = require('gulp-util'),
  fs      = require('fs'),
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
  bunyan,
  env     = gutil.env.type || 'dev',
  paths   = {
    src         : path.join(__dirname, 'client'),
    dist        : path.join(__dirname, 'dist'),    
    webpackfile : (env === 'prod') ? './webpack.config.js' : './webpack.config.dev.js'
  }

gulp.task('bundle', function () {
  log(chalk.bgWhite.black.italic('Bundling for ' + env));
  log(chalk.bgWhite.green.bold('Using ' + path.basename(paths.webpackfile)));
  
  return gulp.src(path.join(paths.src, 'main.ts'))
    .pipe(webpack(require(paths.webpackfile)))
    .pipe(gulp.dest(paths.dist));
});

// gulp.task('cp:static', function () {
//   return gulp.src([path.join(paths.src, 'index.html'), path.join(paths.src, 'favicon.ico')])
//     .pipe(gulp.dest(paths.dist));
// });

gulp.task('clean', function (cb) {
  del([paths.dist], { force: true });
  cb();
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



gulp.task('nodemon', ['clean', 'bundle'], function () {
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

gulp.task('default', ['nodemon']);