import path from 'path';

module.exports = (rootPath, env) => {
  return {
    clientSrc: path.join(rootPath, 'client'),
    appFilesPaths: ['app.js', 'db.js', 'boot.js', './utils/**/*.js', './routes/**/*.js', './models/**/*.js']
      .map(i => path.join('./server', i)),
    clientDist: path.join(rootPath, 'wwwroot/dist'),
    appDist: path.join(rootPath, 'wwwroot'),
    testsSrc: path.join(rootPath, 'tests/**/*.spec.js'),
    webpackfile: (env === 'prod' || env === 'production') ?
      path.resolve(rootPath, './webpack.config.js') : path.resolve(rootPath, './webpack.config.dev.js')
  }
};