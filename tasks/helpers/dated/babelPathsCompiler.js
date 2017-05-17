import * as gulp from 'gulp';
import path from 'path';
import fs from 'fs';
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'merge-stream']
});

//let appFilesPaths = ['app.js', 'utils', 'routes', 'db.js', 'boot.js', 'models'];
let streams = [];

let compileAppFile = (file, rel) => {
  let fullDestPath = path.join(paths.appDist, rel);
  let stream = gulp.src(file)
    .pipe($.babel())
    .pipe($.debug({
      title: '[Gulp-Debug]:: ',
      minimal: true
    }))
    .pipe(gulp.dest(fullDestPath))
    .on('finish', () => { log('[compile_done]:: ', file) })
    .on('error', (err) => { log('[compile_error]:: ', err) });
  streams.push(stream);
};

let traverseAppPaths = (fsEntity, rel = paths.appRoot) => {
  let fullPath = path.join(rel, fsEntity);
  fs.stat(fullPath, (err, stats) => {
    if (err)
      throw new Error(`Error reading app file :  ${err}`);
    if (stats.isFile())
      compileAppFile(fullPath, rel);
    else /* if stats.isDirecotory() */ {
      fs.readdir(fullPath, (err, files) => {
        if (err) throw new Error(`Error reading app directory's files :  ${err}`);
        files.forEach(item => traverseAppPaths(item, fsEntity));
      });
    }
  });
};

export default babelCompilePaths = (appFilesPaths) => {
  appFilesPaths.forEach(fsItem => traverseAppPaths(fsItem));
  return $.mergeStream(streams)
    .pipe($.debug({
      title: '[merged_streams]:: ',
      minimal: true
    }));
}