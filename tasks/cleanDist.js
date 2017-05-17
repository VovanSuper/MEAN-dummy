import { cleanAssets } from './helpers/functions';

module.exports = (params) => {
  return (cb) => {
    cleanAssets(params.appDist, cb);
  };
}