module.exports = app => {
  const Events = app.db.models.Events;
  const Users = app.db.models.Users;

  let attachUsers = (event) => {
    if (!event) throw Error('Event object is not provided!!!');
    if ((event['users']).length === 0) return [];
    return event['users'].map(u => {
        return {
          _id: u._id,
          name: u.name,
          email: u.email,
          registered: u.registered
        }
      });
  }

  let updateUsers = (postUId, event, resp) => {
    Users.findByIdAndUpdate(postUId, {
      $addToSet: {
        events: event['_id']
      }
    }, {
        new: true
      },
      (err, user) => {
        if (err)
          return resp.status(500).json({
            operationStatus: `Error trying to update User ${postUId} for event field of ${event}`,
            err: err
          });
      });
  }

  const eventsRouter = require('express').Router();
  
  eventsRouter.route('/all')
    .get((req, resp) => {
      Events.find({}, '-__v')
        .populate('users')
        .then((items) => {
          let eventPopUsers = [];
          items.forEach(ev => {
            let usersOfEv = attachUsers(ev);
            eventPopUsers.push({
              id: ev._id,
              name: ev.name,
              startTime: ev.startTime,
              endTime: ev.endTime,
              users: usersOfEv
            });
          });
          resp.status(200).json({
            operationStatus: 'Found',
            data: eventPopUsers
          });
        })
        .catch((err) => {
          return resp.status(404).json({
            operationStatus: 'Server Error',
            err: err
          });
        });
    });

  eventsRouter.route('/')
    .all((req, resp, next) => {
      if (!req.xhr) return next();
    })

    .get((req, resp) => {
      resp.status(301).redirect('/events/all');
    })
    .post((req, resp) => {
      let postedUsers = req.body.users.trim().split(',');
      let newEvent = new Events({
        name: req.body.name,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        users: (postedUsers && postedUsers.length > 0) ? postedUsers : []
      });

      newEvent.save((err, ev) => {
        if (err)
          return resp.status(412).json({
            operationStatus: `Error trying to save event ${ev}`,
            err: err
          });

        postedUsers.forEach(postUId => {
          updateUsers(postUId, ev, resp);
        });
        resp.status(201).json({
          operationStatus: `Created event id ${ev['_id']}`,
          data: ev
        });
      });
    });

  eventsRouter.param('id', (req, resp, next, id) => {
    Events.findById(id, '-__v')
      .populate('users')
      .then((ev) => {
        if (!ev) throw new Error(`No Event with id: ${id}`);

        resp.locals.event = ev;
        next();
      })
      .catch((err) => {
        return resp.status(412).json({
          operationStatus: `No event with id: ${id}`,
          err: err
        });
      });
  })

    .route('/:id')
    .all((req, resp, next) => {
      if (!req.xhr) return next();
    })
    .get((req, resp) => {
      let item = resp.locals.event;
      let event = {
        id: item._id,
        name: item.name,
        startTime: item.startTime,
        endTime: item.endTime,
        users: attachUsers(item)
      }
      resp.status(200).json({
        operationStatus: 'Found',
        data: event
      });
    })
    // .use( passport.authenticate('jwtAuth
    .put((req, resp) => {
      let ev = resp.locals.event;
      let postedUsers = req.body.users.trim().split(',');
      ev.name = req.body.name;
      ev.startTime = Date.parse(req.body.startTime);
      ev.endTime = Date.parse(req.body.endTime);
      ev.users = (postedUsers && postedUsers.length > 0) ? postedUsers : [];
      ev.markModified('users');
      ev.markModified('startTime');
      ev.markModified('endTime');
      ev.save((err, ev) => {
        if (err)
          return resp.status(404).json({
            operationStatus: 'Error updating Event',
            err: err
          });
        postedUsers.forEach(postUId => { //TODO: extract a pluging for that -> aka trigger/stored_proc
          updateUsers(postUId, ev, resp);
        });

        resp.status(201).json({
          operationStatus: `Created event id ${ev['_id']}`,
          data: ev
        });
      });
    })

    .delete((req, resp) => {
      Events.findByIdAndRemove(resp.locals.event['_id'], (err, event) => {
        if (err)
          return resp.status(500).json({
            operationStatus: 'Error deleting Event',
            err: err
          });

        resp.status(200).json({
          operationStatus: `Removed event id ${resp.locals.event['_id']}`
        });
      });
    })

    .patch((req, resp) => {
      let ev = resp.locals.event;
      let postedUsers = req.body.users.trim().split(',');
      if (req.body.id)
        delete req.body.id;
      if (req.body.startTime)
        req.body.startTime = Date.parse(req.body.startTime);
      if (req.body.endTime)
        req.body.startTime = Date.parse(req.body.endTime);
      if (req.body.users) {
        req.body.users = (postedUsers && postedUsers.length > 0) ? postedUsers : [];
      }
      for (let key in req.body)
        ev[key] = req.body[key];
      ev.markModified('users');
      ev.save((err, item) => {
        if (err)
          return resp.status(404).json({
            operationStatus: 'Error patching item',
            err: err
          });
        postedUsers.forEach(postedUId => {
          updateUsers(postedUId, ev, resp);
        });

        resp.status(201).json({
          operationStatus: `Patched event id ${item['_id']}`,
          data: item
        });
      });
    });

  app.use('/events', eventsRouter);
}
