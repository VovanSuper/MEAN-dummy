import * as chalk from 'chalk';
//import nodemon from 'gulp-nodemon';
import { log } from './helpers/functions';
let nodemon = require('gulp-nodemon');
let bunyan = null;

module.exports = () => {
  return () => {
    let stream = nodemon({
      exec: 'babel-node',
      watch: ['app.js', 'gulpfile.js', 'boot.js', 'db.js', './routes', './models', './libs', './utils', './client'],
      script: 'app',
      ext: 'js html css',
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
      .on('exit', () => {
        log(chalk.bgYellow.black.italic('Exiting nodemon'));
      });

    return stream;
  }
}