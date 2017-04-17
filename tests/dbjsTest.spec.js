require('babel-register');

var should = require('should'),
  path = require('path'),
  //appJs       = require(path.relative(__dirname, '../app.js')),
  eventsRoute = require(path.resolve(__dirname, '..', 'routes/events.js')),
  supertest = require('supertest'),
  request = supertest.agent(require('../app.js'));

var app = {
  basePath: path.resolve(__dirname, '..')
}

var dbJs = require(path.resolve(__dirname, '..', 'db.js')),
  Events = (dbJs(app)).models.Events;

describe('db.js: ', function() {
  it('should return {} and have properties `mongoose, connection, models` ', function() {
    var db = require(path.resolve(__dirname, '..', 'db.js'))(app);
    db.should.exist;
    db.should.be.type('object');
    db.should.have.property('mongoose');
    db.should.have.property('models').with.length(2);
    db.should.have.property('connection').with.lengthOf(10);
  })
});

describe('Events:', function() {
  var testEventId = null;
  beforeEach(function(done) {
    let events = [{
      name: 'Event 1',
      startTime: Date.now(),
      endTime: Date.now(),
      users: []
    }, {
      name: 'Event 2 ',
      startTime: Date.now(),
      endTime: Date.now(),
      users: []
    }]

    Events.create(events, function(err, newEvs) {
      if (err) return console.dir(err);
      console.log('Events are created: ' + newEvs.length);
    }).then(function(events) {
      testEventId = events[0]._id;
      console.log(testEventId);  
      done();
    })
  });

  it('should get all events', function(cb) {
    request.get('http://localhost:8080/events/all')
      .expect(200)
      .end(function(err, results) {
        if (err) throw `Error repertest.request: ${err}` ;
        results.body.should.exist;
        cb();
      });
  });

  it('should delete multiple Events from db with quety : DELETE /events/{<<Mongo.ObjectId>>+}', function() {
    //eventsRoute(appJs).ro
  });

  afterEach(function(done) {
    Events.remove({}).exec();
    done()
  });
})
