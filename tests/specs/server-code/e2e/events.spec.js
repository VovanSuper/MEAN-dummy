const path = require('path'),
  expect = require('chai').expect,
  root = process.cwd(),
  app = require(path.resolve(root, 'server', 'app.js')),
  supertest = require('supertest'),
  request = supertest.agent(app),
  appStub = {
    locals: {
      basePath: path.resolve(root, 'server')
    }
  }
  , dbJs = require(path.resolve(root, 'server', 'db.js')),
  Events = (dbJs(appStub)).models.Events,
  Users = (dbJs(appStub)).models.Users;


describe('Events route', function () {
  this.timeout(7000);
  let testEventId = null;
  let testUsersIds = [];

  beforeEach(done => {
    const events = [{ name: 'Event 1' }, { name: 'Event 2 ' }];

    const usersToEvent = [{
      name: 'Vovan_Super_To_Event1',
      username: 'Suppa_Vovan1!',
      email: 'suppa-man1@example.net',
      password: '111___',
      work_place: 'HOME Studio'
    }, {
      name: 'Vovan_Duper_To_Event2',
      username: 'Dupa_Vovan2@',
      email: 'duppa-man3@gmail.info',
      password: '222___'
    }];

    Users.remove({}, (err) => {
      Events.remove({}, (err) => {
        if (err) throw `Error beforeEach hook in events.spec.js : ${err}`;

        Users.collection.insertMany(usersToEvent, { ordered: true }, (err, newUsrs) => {
          if (err || !newUsrs) throw `Error beforeEach hook in events.spec.js Users.insertMany (no users) : ${err}`;
          testUsersIds[0] = newUsrs['ops'][0]['_id']
          testUsersIds[1] = newUsrs['ops'][1]['_id']

          let eventToInsert0 = Object.assign({}, events[0], { participants: [testUsersIds[0]] })
          let eventToInsert1 = Object.assign({}, events[1], { participants: testUsersIds, createdBy: testUsersIds[0] });
         
          Events.collection.insertMany([eventToInsert0, eventToInsert1], { ordered: true }, (err, newEvs) => {
            if (err || !newEvs) return console.error(err);
            testEventId = newEvs['ops'][0]['_id'];
            done();
          });
        });
      });
    })
  });

  it('should get all Events: GET /events/all', cb => {
    request.get('/events/all')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body.operationStatus).to.exist.and.to.contain('Found');
        expect(JSON.stringify(results.body)).to.exist.and.to.contain(testEventId.toString());
        expect(JSON.stringify(results.body)).to.contain('participants');
        expect(results.body.data).to.exist.and.to.be.lengthOf(2);
        expect(results.body.data[0]).to.exist.and.to.haveOwnProperty('participants');
        //expect(results.body.data[0].users).to.exist.and.to.include(testEventId[0]);
        cb();
      });
  });

  it('should return single Event with provided id: GET /events/:id', cb => {
    request.get(`/events/${testEventId}`)
      .set('Accept', 'application/json')
      // .set('X-Requested-With', 'XMLHttpRequest')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.be.an('string');
        expect(results.body.operationStatus).to.exist.and.to.contain('Found');
        expect(results.body.data).to.exist.and.to.have.property('participants');
        expect(results.body.data).to.haveOwnProperty('id', `${testEventId}`);
        expect(results.body.data['id']).equals(`${testEventId}`);
        cb();
      });
  });

  it('should create new Event: POST /events', cb => {
    const testEvent = {
      name: 'Yet Another Test Event 2',
      startTime: Date.now(),
      endTime: new Date(2018, 12, 14, 6, 0, 0, 0),
      createdAt: Date.now(),
      createdBy: testUsersIds[0],
      participants: [...testUsersIds]
    }

    request.post('/events/')
      .type('application/json')
      .accept('json')
      .send(JSON.stringify(testEvent))
      .expect(201)
      .end((err, results) => {
        if (err) throw new Error(`Error supertest.request: ${err}`);
        expect(results.ok).to.be.true;
        expect(results.type).to.be.a('string');
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain('Created');
        expect(results.body.operationStatus).to.not.contain('Error');
        expect(results.body).to.exist.and.to.haveOwnProperty('data');
        cb();
      });
  });

  it('should properly patch a test Event: PATCH /events/:id', cb => {
    request.patch(`/events/${testEventId}`)
      .type('application/json')
      .send({ name: 'Changed Event Name' })
      .send({ endTime: Date.parse('2021-09-11T13:51:50.417Z') })
      .send({ startTime: Date.parse('2019-01-26T13:51:50.417Z') })
      .send({ participants: [] })
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.be.a('string');
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain('Patched');
        expect(results.body.operationStatus).to.not.contain('Error');
        expect(results.body.data).to.exist.and.to.have.property('id', `${testEventId}`);
        expect(results.body.data.name).to.exist.and.to.be.equal('Changed Event Name');
        expect(results.body.data.startTime).to.exist.and.to.eqls('2019-01-26T13:51:50.417Z');
        expect(results.body.data.endTime).to.exist.and.to.eqls('2021-09-11T13:51:50.417Z');
        cb();
      });
  });

  it('should properly change all props of a test Event: PUT /events/:id', cb => {
    let startDate = new Date(2018, 10, 27, 9, 24, 11, 0);
    let endDate = new Date(2022, 11, 20);
    
    request.put(`/events/${testEventId}`)
      .type('application/json')

      .send({ name: 'New PUTed event name' })
      .send({ endTime: endDate })
      .send({ startTime: startDate })
      .send({ users: [...testUsersIds] })
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.be.a('string');
        expect(results.ok).to.be.true;
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain('Modified');
        expect(Date.parse(results.body.data.endTime)).to.exist.and.to.be.equal(endDate.getTime());
        expect(Date.parse(results.body.data.startTime)).to.exist.and.to.be.equal(startDate.getTime());
        expect(results.body.data).to.exist.and.to.have.property('id', `${testEventId}`);
        expect(results.body.data).to.exist.and.to.haveOwnProperty('name', 'Should be "New PUTed event name"');
        //expect(results.body.data[0].users).to.exist;
        cb();
      });
  });

  it('should delete Event from db with query : DELETE /events/:id', cb => {
    request.delete(`/events/${testEventId}`)
      .set('Accept', 'application/json')
      .expect(202)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain(`Removed event id ${testEventId}`);
        cb();
      });
  });

});