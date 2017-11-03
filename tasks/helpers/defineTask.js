import path from 'path';

module.exports = (gulp, root) => (taskName, taskfileName, params) => {
  params = params || {};
  params.taskName = taskName;
  params.gulp = gulp;
  let fullTaskPath = path.join(root, 'tasks', taskfileName);

  return gulp.task(taskName, (callback) => {
    let task = require(fullTaskPath).call(this, params);
    return task(callback);
  });
}