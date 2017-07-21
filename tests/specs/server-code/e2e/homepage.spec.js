const path = require('path'),
  expect = require('chai').expect,
  root = process.cwd(),
  app = require(path.resolve(root, 'server', 'app.js')),
  supertest = require('supertest'),
  request = supertest.agent(app);

describe('Index route', () => {
  it('should return index file', cb => {
    request.get('/')
      .expect(200)
      .end((err, results) => {
        if (err) throw `Error supertest.request: ${err}`;

        expect(results.type).to.exist.and.to.be.a('string');
        expect(results.body).to.exist;
        cb();
      })
  });

});