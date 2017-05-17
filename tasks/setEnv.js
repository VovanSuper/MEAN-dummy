import set from 'gulp-env';

module.exports = (params) => {
  return (callback) => {
    set({
      NODE_ENV: params.type,
      ENV: params.type
    });
    callback();
  }
}