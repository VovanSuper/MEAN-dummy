
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
  Users = (dbJs(app)).models.Users;

describe('Users route', () => {

  let testUserId = null;

  beforeEach(done => {
    const users = [{
        name: 'Vladimir Ovsyukov',
        username: 'Vovan_Super',
        email: 'vovansuper@mail.ru',
        password: 'triton111',
        events: []
      },
      {
        name: 'Alex Ovsyukov',
        username: 'Alex47',
        email: 'alex@gmail.com',
        password: 'triton333',
        work_place: 'HomeApp',
        events: []
      }];

    Users.remove({}, (err) => {
      if (err) throw `Error after hook: ${err}`;

      Users.collection.insert(users, (err, newUsrs) => {
        if (err) return console.dir(err);
        testUserId = newUsrs['ops'][0]._id;
        done();
    });
  });
  });

  it('should return all users', cb => {
    request.get('/users/all')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist.and.to.haveOwnProperty('data');
        expect(results.body).to.haveOwnProperty('operationStatus');
        expect(JSON.stringify(results.body)).to.contain(testUserId.toString());
        cb();
      });
  });

  it('should return single Event with provided id: GET /users/:id', cb => {
    request.get(`/users/${testUserId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.exist.and.to.be.an('string');
        expect(results.body).to.exist.and.to.haveOwnProperty('data');
        expect(results.body.operationStatus).to.contain('Found');
        expect(results.body.data).to.include.keys(['name', 'email']);        
        expect(results.body.data).to.haveOwnProperty('username');
        cb();
      });
  });

  it('should delete Event from db with quety : DELETE /users/:id', cb => {
    request.delete(`/users/${testUserId}`)
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist;
        expect(results.body.operationStatus).to.exist.and.to.be.equal(`User ${testUserId} removed`)
        cb();
      });
  });

});