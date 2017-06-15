import del                       from 'del';
import { env, log, PluginError } from 'gulp-util';

const cleanAssets = (path, cb) => {
  del.sync(path, { force: true });
  cb();
}
const wpReporter = (err, wpStats) => {
  if (err) throw new PluginError('[webpack:error]::', err);
  log('[webpack]', wpStats.toString('minimal'));
}

module.exports = {
  cleanAssets: cleanAssets,
  wpReporter: wpReporter,
  log: log,
  env: env.type ||  process.env.NODE_ENV || process.env.ENV || 'development'
}