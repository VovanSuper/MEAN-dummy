import env from 'gulp-env';

module.exports = (params) => (callback) => {
  env.set({
    NODE_ENV: params.type,
    ENV: params.type
  });
  callback();
}