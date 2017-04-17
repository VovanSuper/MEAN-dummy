require('babel-register');

const gulp = require('gulp'),
  gutil = require('gulp-util'),
  debug = require('gulp-debug'),
  fs = require('fs'),
  path = require('path'),
  nodemon = require('gulp-nodemon'),
  del = require('del'),
  webpack = require('webpack-stream'),
  babel = require('gulp-babel'),
  mocha = require('gulp-mocha'),
  gulpEnv = require('gulp-env'),
  merged = require('merge-stream'),
  named = require('vinyl-named'),
  cache = require('gulp-file-cache'),
  concat = require('gulp-concat'),
  chalk = require('chalk'),
  spawn = require('child_process').spawn,
  log = gutil.log,
  Cache = new cache(),
  env = gutil.env.type || 'dev',
  paths = {
    clientSrc: path.join(__dirname, 'client'),
    clientDist: path.join(__dirname, 'dist'),
    appDist: path.join(__dirname, 'wwwroot'),
    webpackfile: (env === 'prod' || env === 'production') ? './webpack.config.js' : './webpack.config.dev.js'
  };
let bunyan;

const cleanAssets = (path, cb) => {
  del.sync(path, { force: true });
  cb();
}

const webpackReporter = (err, wpStats) => {
  if (err) throw new gutil.PluginError('[webpack:error]::', err);
  log('[webpack]', wpStats.toString('normal'));
}

gulp.task('clean:client', (cb) => {
  cleanAssets(paths.clientDist, cb);
});

gulp.task('clean:wwwroot', (cb) => {
  cleanAssets(paths.appDist, cb);
});

gulp.task('bundle', ['clean:client'], (cb) => {
  gulpEnv.set({
    NODE_ENV: 'production',
    ENV: 'prod'
  });
  log(chalk.bgWhite.black.italic('Bundling for ' + env));
  log(chalk.bgWhite.green.bold('Using ' + path.basename(paths.webpackfile)));
  gulp.src([path.join(paths.clientSrc, 'main.ts'), path.join(paths.clientSrc, 'polyfills.ts')])
    .pipe(webpack(require(paths.webpackfile), null, webpackReporter))
    .pipe(gulp.dest(paths.clientDist));
  cb();
});

gulp.task('compile', ['clean:wwwroot'], (cb) => {
  gulpEnv.set({
    NODE_ENV: 'production',
    ENV: 'prod'
  });
  let appFilesPaths = ['app.js', 'utils', 'routes', 'db.js', 'boot.js', 'models'];
  let streams = [];

  let compileAppFile = (file, rel) => {
    log('[compile:Rel]:: ', rel)
    let fullDestPath = path.join(paths.appDist, rel);
    log('[compile:full_Path]:: ', file);
    log('[compile:full_Dest]:: ', fullDestPath)

    let stream = gulp.src(file)
      .pipe(babel())
      .pipe(debug({
        title: '[Gulp-Debug]:: '
      }))
      .pipe(gulp.dest(fullDestPath))
      .on('finish', () => { log('DONE:: ', file) })
      .on('error', (err) => { log('[compile_error]::', err) });
    streams.push(stream);
  }

  let traverseAppPaths = (fsEntity, rel = './') => {
    log('[traverse]:Rel:: ', rel)
    let fullPath = path.join(rel, fsEntity);
    fs.stat(fullPath, (err, stats) => {
      if (err) throw new Error(`Error reading app file :  ${err}`);
      if (stats.isFile()) {
        log('[traverse:fullPath]:: ', fullPath)
        compileAppFile(fullPath, rel);
      } else {
        fs.readdir(fullPath, (err, files) => {
          if (err) throw new Error(`Error reading app directory's files :  ${err}`);
          files.forEach(item => traverseAppPaths(item, fsEntity));
        })
      }
    })
  }
  appFilesPaths.forEach(fsItem => traverseAppPaths(fsItem));
  return merged(streams)
    .pipe(debug({
      title: '[merged_streams]:: ',
      minimal: false
    }));
  cb();
});

gulp.task('compileBundle:prod', ['compile', 'bundle'] );

gulp.task('nodemon:dev', ['bundle'], () => {

  let stream = nodemon({
    exec: 'babel-node',
    watch: ['app.js', 'gulpfile.js', 'boot.js', 'db.js', './routes', './models', './libs', './utils', './client'],
    script: 'app',
    ext: 'js html css',
    ignore: ['./node_modules', './mongod', './data', './dist']
  })
    .on('readable', () => {
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
    .on('restart', () => {
      log(chalk.bgGreen.red.bold('Restarting by server'));
    })
    .on('start', () => {
      log(chalk.bgGreen.black.bold('Starting server'));
    })
    .on('crash', () => {
      log(chalk.bgRed.black.bold('Crached... restatring'));
      stream.emit('restart', 500);
    });

});

gulp.task('tests:w', () => {
  gulpEnv.set({
    NODE_ENV: 'test',
    ENV: 'test'
  });
  gulp.watch('tests/**/*.spec.js', { read: false })
    .on('change', (file) => {
      gulp.src(file.path)
        .pipe(mocha({
          reporter: 'nyan',
          compilers: {
            js: babel
          }
        }));
    });
});

gulp.task('default', ['bundle', 'nodemon:dev']);