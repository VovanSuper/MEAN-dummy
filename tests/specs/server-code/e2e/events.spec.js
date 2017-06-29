
const path = require('path'),
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

  let testEventId = null;

  beforeEach(done => {
    const events = [{
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
        testEventId = newEvs['ops'][0]._id;
        done();
      });
    });
  });

  it('should get all events', cb => {
    request.get('/events/all')
      .set('Accept', 'application/json')
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
      .set('Accept', 'application/json')
      //.set('X-Requested-With', 'XMLHttpRequest')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.exist.and.to.be.an('string');
        expect(results.body.operationStatus).to.exist.and.to.contain('Found');
        expect(results.body.event).to.exist.and.to.haveOwnProperty('users');
        expect(results.body.event).to.haveOwnProperty('_id', `${testEventId}`);
        expect(results.body.event['_id']).equals(`${testEventId}`);
        cb();
      });
  });

  it('should delete Event from db with quety : DELETE /events/:id', cb => {
    request.delete(`/events/${testEventId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist;
        expect(results.body.operationStatus).to.exist.and.to.contain(`${testEventId}` + ' removed');
        cb();
      });
  });

});