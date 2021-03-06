import chalk       from 'chalk';
import { log }     from './helpers/functions';
let nodemon        = require('gulp-nodemon');
let bunyan, stream = null;

module.exports = () => (callback) => {
  stream = nodemon({
    exec: 'babel-node',
    watch: ['app.js', 'boot.js', 'db.js', 'setup.js', 'routes', 'models', 'libs', 'utils'].map(i => './server/' + i),
    script: './server/app.js',
    ext: 'js',
    ignore: ['./node_modules', './mongod', './data', './dist', './wwwroot']
  })
    .on('readable', () => {
      // free memory 
      if (bunyan) {
        bunyan && bunyan.kill();
      }
      bunyan = require('child_process').spawn('./node_modules/bunyan/bin/bunyan', [
        '--output', 'short',
        '--color'
      ]);
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
    })
    .on('end', callback)
    .on('exit', () => {
      log('Exiting nodemon');
    });

  return stream;
}

process.on('SIGUSR2', () => { if (stream) stream.emit('quit'); process.emit('exit', 0); });
