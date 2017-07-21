import path     from 'path';
import fs       from 'fs';
import mongoose from 'mongoose';
import config   from 'config';

let db = null;

module.exports = app => {
  if (!db) {
    const conf = {
      host: config.get('database.host'),
      creds: config.get('database.creds')
    };
    mongoose.Promise = require('bluebird');
    mongoose.connect(conf.host, { useMongoClient: true });
    db = {
      mongoose: mongoose,
      connection: mongoose.connection,
      models: {}
    };

    let modelsDir = path.resolve(app.locals.basePath, 'models');
    fs.readdirSync(modelsDir)
      .filter(fName => fs.statSync(path.join(modelsDir, fName)).isFile() && fName.indexOf('.js') !== -1)
      .forEach(fName => {
        let filePath = path.join(modelsDir, fName)
        let modelName = fName.slice(0, fName.indexOf('.'));
        db.models[modelName] = (require(filePath))(mongoose);
      });
  }
  return db;
}