module.exports = app => {

  const Users = app.db.models.Users;

  let attachEvents = (user) => {
    if (!user) throw new Error('Event object is not provided!!!');
    if (!(user['events']).length) return [];
    return (user['events']).map(ev => {
      return {
        _id: ev._id,
        name: ev.name,
        startTime: ev.startTime,
        endTime: ev.endTime
      }
    });
  }

  const usersRouter = require('express').Router();

  usersRouter.route('/all')
    .get((req, resp) => {
      Users.find({}, '-__v')
        .populate('events')
        .then(items => {
          if (!items) throw 'No users found'
          let users = items.map(user => Object.assign({}, {
            name: user.name,
            username: user.username,
            email: user.email,
            work_place: user.work_place,
            registered: user.registered
          }, { events: attachEvents(user) }));

          return resp.status(200).json({
            operationStatus: 'Ok',
            users: users
          });
        })
        .catch(err => {
          return resp.status(412).json({
            operationStatus: 'Server error',
            err: err
          });
        });
    });

  usersRouter.route('/')
    .get((req, resp) => {
      resp.status(301).redirect('/users/all');
    })
    .post((req, resp) => {
      let newUser = new Users({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        registered: req.body.registered,
        work_place: req.body.work_place,
        events: [...req.body.events]
      });

      newUser.save()
        .then((item) => {
          resp.status(201).json({
            operationStatus: 'Saved',
            item: item
          });
        })
        .catch((err) => {
          return req.status(412).json({
            operationStatus: 'Error trying to save entity',
            err: err
          });
        });
    });

  usersRouter.param('id', (req, resp, next, id) => {
    Users.findById(id, '-__v')
      .populate('events')
      .then(user => {
        if (!user)
          throw `No user present in database with id of ${id}`;

        req.user = user;
        next();
      })
      .catch(err => {
        return resp.status(412).json({
          operationStatus: `No User with id: ${id}`,
          err: err
        });
      });
  })
    .route('/:id')
    .get((req, resp) => {
      let usersPopEvents = {
        username: req.user.username,
        name: req.user.name,
        email: req.user.email,
        registered: req.user.registered,
        work_place: req.user.work_place,
        event: attachEvents(req.user)
      }
      resp.status(200).json({
        operationStatus: 'Found',
        users: usersPopEvents
      });
    })
    .put((req, resp) => {
      let user = req.user;
      user.username = req.body.username;
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.work_place = req.body.work_place;

      Users.findByIdAndUpdate(req.user['_id'], {
        $set: {
          username: user.username,
          name: user.name,
          email: user.email,
          password: user.password,
          work_place: user.work_place
        }
      }, {
          new: true
        }, (err, user) => {
          if (err)
            return resp.status(500).json({
              operationStatus: `Error updating user ${user['_id']}`,
              err: err
            });
          resp.status(204).json({
            operationStatus: `Updated user ${user['_id']}`
          });
        });
    })
    .patch((req, resp) => {
      let user = req.user;
      for (let field in req.body) {
        user[field] = req.body[field];
      }
      user.save()
        .then((item) => {
          resp.status(201).json({
            operationStatus: 'Patched successfully',
            item: item
          });
        })
        .catch((err) => {
          return req.status(412).json({
            operationStatus: 'Error trying to save entity',
            err: err
          });
        });
    })
    .delete((req, resp) => {
      Users.findByIdAndRemove(req.user['_id'], (err) => {
        if (err)
          return resp.status(500).json({
            operationStatus: 'Error deleting Event',
            err: err
          });
        resp.status(200).json({
          operationStatus: `User ${req.user['_id']} removed`
        });
      });
    });

  app.use('/users', usersRouter);
}
