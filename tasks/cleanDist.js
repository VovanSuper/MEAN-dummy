import { cleanAssets } from './helpers/functions';

module.exports = (params) => (cb) => {
  cleanAssets(params.appDist, cb);
}