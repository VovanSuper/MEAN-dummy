import path   from 'path';
import config from 'config';

module.exports = (rootPath) => {
  return {
    clientSrc     : path.join(rootPath, config.get('paths.clientSrc')),
    appFilesPaths : (config.get('paths.appFilesPaths')).map(fGlob => path.join(rootPath, 'server', fGlob)),
    clientDist    : path.join(rootPath, config.get('paths.clientDist')),
    appDist       : path.join(rootPath, config.get('paths.appDist')),
    testsSrc      : path.join(rootPath, config.get('paths.testsSrc')),
    webpackfile   : path.join(rootPath, config.get('paths.webpackFile'))
  }
};