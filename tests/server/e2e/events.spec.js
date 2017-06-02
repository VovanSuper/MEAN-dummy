
let path = require('path'),
  expect = require('chai').expect,
  root = process.cwd(),
  app = require(path.resolve(root, 'server', 'app.js')),
  supertest = require('supertest'),
  request = supertest.agent(app),
  appStub = {
    basePath: path.resolve(root, 'server')
  },
  dbJs = require(path.resolve(root, 'server', 'db.js')),
  Events = (dbJs(app)).models.Events;

describe('Events route', () => {

  var testEventId = null;

  beforeEach(done => {
    let events = [{
      name: 'Event 1',
      startTime: Date.now(),
      endTime: Date.now(),
      users: []
    }, {
      name: 'Event 2 ',
      startTime: Date.now(),
      endTime: Date.now(),
      users: ['58fa534e41973a0cf40711a3']
    }];

    Events.remove({}, (err) => {
      if (err) throw `Error beforeEach hook in events.spec.js : ${err}`;

      Events.collection.insert(events, (err, newEvs) => {
        if (err) return console.dir(err);
        //console.log('Events are created: ' + JSON.stringify(newEvs.ops));

        testEventId = newEvs['ops'][0]._id;
        //console.log(`Test First event id: ${testEventId}`);
        done();
      });
    });
  });

  it('should get all events', cb => {
    request.get('/events/all')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist;
        expect(results.body.length).to.be.greaterThan(0);
        cb();
      });
  });

  it('should return single Event with provided id: GET /events/:id', cb => {
    request.get(`/events/${testEventId}`)
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.exist.and.to.be.an('string');
        expect(results.body.operationStatus).to.exist.and.to.contain('Found');
        expect(results.body.event).to.exist.and.to.haveOwnProperty('users');
        expect(results.body.event).to.haveOwnProperty('_id', `${testEventId}`);
        //expect(results.body.event['_id']).equals(`${testEventId}`);
        //console.log('GETID res : ', results.body);
        cb();
      });
  });

  it('should delete Event from db with quety : DELETE /events/:id', cb => {
    request.delete(`/events/${testEventId}`)
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist;
        cb();
      });
  });

});