import path     from 'path';
import fs       from 'fs';
import mongoose from 'mongoose';
import config   from 'config';

let db = null;

module.exports = app => {
  if (!db) {
    const conf = {
      host  : process.env.ENV === 'test' ? 'mongodb://localhost:27017/test' : config.get('database.host'),
      creds : process.env.ENV === 'test' ? null : config.get('database.creds')
    };
    mongoose.Promise = require('bluebird');
    
    mongoose.connect(conf.host);

    db = {
      mongoose   : mongoose,
      connection : mongoose.connection,
      models     : {}
    };

    let modelsDir = path.join(app.basePath, 'models')
    fs.readdirSync(modelsDir)
      .filter(item => {
        return item.indexOf('.js') !== 0;
      })
      .forEach(fileName => {
        let filePath = path.join(modelsDir, fileName)
        let modelName = fileName.slice(0, fileName.indexOf('.'));
        db.models[modelName] = (require(filePath))(mongoose);
      });
  }
  return db;
}