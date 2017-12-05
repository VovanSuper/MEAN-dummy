module.exports = app => {

  let Users = app.db.models.Users;
  let retUser = app.utils.Helpers.retUserJson;
  let splitSubParams = app.utils.Helpers.splitSubParams;
  let Handler = app.utils.Handlers;
  let idParamHandler = app.middlewares.IdParamHandler;
  let makeJwt = app.utils.Jwt;

  const usersRouter = require('express').Router();

  usersRouter.route('/all')
    .get((req, resp) => {
      Users.find({}, '-__v')
        .populate('events')
        .then((users) => {
          return Handler.Ok(resp, 200, users.map(retUser), 'Found');
        })
        .catch((err) => { return Handler.Error(resp, 404, err, 'Not found') });
    });

  usersRouter.route('/')
    .get((req, resp) => {
      resp.status(301).redirect('/users/all');
    })

    .post((req, resp) => {
      let newUser = new Users({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        work_place: req.body.work_place
      });
      newUser.save().then((user) => {
        let token = makeJwt(user['_id']);
        if (!user) throw `Error saving user ${user}`;
        return Handler.Ok(resp, 201, Object.assign({}, user['_doc'], { token }), `Created user id ${user['_id']}`);
      })
        .catch((err) => { return Handler.Error(resp, 412, err, `Error trying to save user: ${err.message || err.toString()}`) });
    });

  usersRouter
    .param('id', idParamHandler(Users, 'events'))
    .route('/:id')
    .get((req, resp) => {
      return Handler.Ok(resp, 200, retUser(resp.locals.user), 'Found');
    })

    .put((req, resp) => {
      let user = resp.locals.user;
      user.username = req.body.username;
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password || null;
      user.work_place = req.body.work_place || '';
      user.markModified('events');

      user.save().then((usr) => {
        return Handler.Ok(resp, 200, retUser(usr), `Modified user ${usr['_id']}`);
      })
        .catch((err) => {
          return Handler.Error(resp, 412, err, `Error updating user ${user['_id']}`)
        });
    })

    .patch((req, resp) => {
      let user = resp.locals.user;
      for (let key in req.body)
        user[key] = req.body[key];
      user.markModified('events');

      user.save().then((usr) => {
        if (!usr) throw 'Error while pathing user';
        return Handler.Ok(resp, 200, retUser(usr), `Patched user id ${usr['_id']}`);
      })
        .catch((err) => {
          return Handler.Error(resp, 412, err || 'no user after PATCH', `Error patching user id ${user['_id']}`);
        });
    })

    .delete((req, resp) => {
      let usrId = resp.locals.user['_id'];

      Users.findByIdAndRemove(usrId).exec().then((res) => {
        return Handler.Ok(resp, 202, null, `Removed user id ${usrId}`);
      })
        .catch(err => { return Handler.Error(resp, 500, err, `Error deleting user id ${usrId}`) })
    });

  app.use('/users', usersRouter);
}
