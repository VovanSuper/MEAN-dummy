module.exports = app => {
  let Users = app.db.models.Users;
  let Handler = app.utils.Handlers;
  let makeJwt = app.utils.Jwt;

  const loginRouter = require('express').Router();

  authRouter.route('/')
    .get((req, resp) => {
      resp.status(200).send('OK');
    })
    .post((req, resp) => {
      let username = req.body.username;
      let password = req.body.password;

      Users.findOne({ 'username': username }, '-__v').then((user) => {
        if (!user)
          throw new Error(`No user with name ${username} found in db, please register`);

        user.comparePassword(password, (err, isMatch) => {
          if (err)
            throw new Error(err);
          if (!isMatch)
            throw new Error('Password validation failed!');

          let token = makeJwt(user['_id']);
          let userObj = {
            id: user['_id'],
            name: user.name,
            username: user.username,
            email: user.email,
            registered: user.registered,
            work_place: user.work_place,
            events: user.events,
          }
          return Handler.Ok(resp, 200, Object.assign({}, userObj, { token }), `Auth success`);
        })
      })
        .catch((err) => { return Handler.Error(resp, 404, err, `${err.message || err.stack || err}`) });
    });

  app.use('/login', loginRouter);
}
