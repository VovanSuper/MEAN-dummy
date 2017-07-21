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
  Users = (dbJs(appStub)).models.Users;

describe('Users route', function () {

  let testUserId = null;

  beforeEach(done => {
    const users = [{
      name: 'Vladimir Ovsyukov',
      username: 'Vovan_Super',
      email: 'vovansuper@mail.ru',
      password: '123@456'
    }, {
      name: 'Alex Ovsyukov',
      username: 'Alex47',
      email: 'alex@gmail.com',
      password: 'abc123!@#',
      work_place: 'HomeApp'
    }];

    Users.remove({}, (err) => {
      if (err) throw `Error after hook: ${err}`;

      Users.collection.insertMany(users, (err, newUsrs) => {
        testUserId = newUsrs['ops'][0]['_id'];
        done();
      });
    });
  });

  it('should return all Users: GET /users/all', cb => {
    request.get('/users/all')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist.and.to.haveOwnProperty('data');
        expect(results.body.operationStatus).to.exist.and.to.contain('Found');
        expect(JSON.stringify(results.body)).to.contain(testUserId.toString());
        cb();
      });
  });

  it('should return single User with provided id: GET /users/:id', cb => {
    request.get(`/users/${testUserId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.exist.and.to.be.an('string');
        expect(results.body).to.exist.and.to.haveOwnProperty('data');
        expect(results.body.operationStatus).to.exist.and.to.contain('Found');
        expect(results.body.data).to.exist.and.to.haveOwnProperty('username');
        expect(results.body.data).to.include.keys(['name', 'email']);
        cb();
      });
  });

  it('should create new User: POST /users', cb => {
    const testUser = {
      name: 'Yet Another User',
      username: 'Tester_1',
      password: '123@!',
      email: 'tester.user@example.com',
      registered: Date.now(),
      work_place: 'Example Inc'
    };

    request.post('/users/')
      .type('application/json')
      .accept('json')
      .send(JSON.stringify(testUser))
      .expect(201)
      .end((err, results) => {
        if (err) throw new Error(`Error supertest.request: ${err}`);
        expect(results.ok).to.be.true;
        expect(results.type).to.be.a('string');
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain('Created');
        expect(results.body.operationStatus).to.not.contain('Error')
        cb();
      });
  });

  it('should properly patch a test User: PATCH /users/:id', cb => {
    const newNameStr = 'Changed Name';

    request.patch(`/users/${testUserId}`)
      .type('application/json')
      .send({ name: newNameStr })
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.type).to.be.a('string');
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain('Patched');
        expect(results.body.operationStatus).to.not.contain('Error');
        expect(results.body.data).to.exist.and.to.have.property('id', `${testUserId}`);
        expect(results.body.data.name).to.exist.and.to.be.equal(newNameStr);
        cb();
      });
  });

  it('should properly change all props of a test User: PUT /users/:id', cb => {
    const newNameStr = 'New PUTed User name';
    const newUsernameStr = 'UserName1';
    const email = 'email@sample.com';
    const workPlace = 'HomePlace';
    const password = '123@111';
    const registered = new Date(2012, 1, 10).toLocaleDateString('ru-ru');

    request.put(`/users/${testUserId}`)
      .type('application/json')
      .send({ name: newNameStr })
      .send({ username: newUsernameStr })
      .send({ registered: registered })
      .send({ work_place: workPlace })
      .send({ email: email })
      .send({ password: password })
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;

        expect(results.type).to.be.a('string');
        expect(results.ok).to.be.true;
        expect(results.body).to.exist.and.to.be.an('object');
        expect(results.body.operationStatus).to.exist.and.to.contain('Modified');
        expect(results.body.data).to.exist.and.to.have.property('id', `${testUserId}`);
        expect(results.body.data).to.exist.and.to.haveOwnProperty('name', newNameStr);
        expect(results.body.data.email.toString()).to.exist.and.to.be.equal(email);
        //expect(results.body.data.registered).to.exist.and.to.be.equal(registered);
        cb();
      });
  });

  it('should delete User from db with quety : DELETE /users/:id', cb => {
    request.delete(`/users/${testUserId}`)
      .expect(202)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;
        expect(results.body).to.exist;
        expect(results.body.operationStatus).to.exist.and.to.be.equal(`Removed user id ${testUserId}`)
        cb();
      });
  });

});