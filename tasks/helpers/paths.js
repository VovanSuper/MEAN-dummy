import path from 'path';

module.exports = (appRoot, env) => {
  return {
    clientSrc: path.join(appRoot, 'client'),
    appFilesPaths: ['app.js', 'db.js', 'boot.js', './utils/**/*.js', './routes/**/*.js', './models/**/*.js'],
    clientDist: (env === 'prod' || env === 'production') ?
      path.join(appRoot, 'wwwroot/dist') : path.join(appRoot, 'dist'),
    appDist: 'wwwroot',
    testsSrc: path.join(appRoot, 'tests'),
    webpackfile: (env === 'prod' || env === 'production') ?
      path.resolve(appRoot, './webpack.config.js') : path.resolve(appRoot, './webpack.config.dev.js')
  }
};