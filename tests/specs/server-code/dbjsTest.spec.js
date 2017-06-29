
let root = process.cwd(),
  should = require('should'),
  path = require('path'),
  app = require(path.resolve(root, 'server', 'app.js')),
  eventsRoute = require(path.resolve(root, 'server', 'routes/events.js')),

  appStub = {
    basePath: path.resolve(root, 'server')
  },
  db = require(path.resolve(root, 'server', 'db.js'))(appStub);



describe('db.js: ', () => {
  it('should return {} and have properties `mongoose, connection, models` ', () => {
    db.should.exist;
    db.should.be.type('object');
    db.should.have.property('mongoose');
    db.should.have.property('models');
    db.should.have.property('connection');
  });
});



