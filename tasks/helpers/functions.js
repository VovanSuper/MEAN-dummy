import del from 'del';
import { env, log, PluginError } from 'gulp-util';

const cleanAssets = (path, cb) => {
  del.sync(path, { force: true });
  cb();
}
const wpReporter = (err, wpStats) => {
  if (err) throw new PluginError('[webpack:error]::', err);
  log('[webpack]', wpStats.toString('normal'));
}

module.exports = {
  cleanAssets: cleanAssets,
  webpackReporter: wpReporter,
  log: log,
  env: env.type || process.env.ENV || process.env.NODE_ENV || 'development'
}