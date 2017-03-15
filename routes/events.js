exports = module.exports = app => {
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

  let eventsRouter = require('express').Router();

  eventsRouter.route('/all')
    .get((req, resp) => {
      Events.find({}, '-__v')
        .populate('users')
        .then((items) => {
          let eventPopUsers = [];
          items.forEach(ev => {
            let users = attachUsers(ev);
            eventPopUsers.push({
              _id: ev._id,
              name: ev.name,
              startTime: ev.startTime,
              endTime: ev.endTime,
              users: users
            });
          });
          resp.status(200).json(eventPopUsers);
        })
        .catch((err) => {
          return resp.status(404).json({
            operationStatus: 'Server Error',
            err: err
          });
        });
    });

  eventsRouter.route('/')
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
          operationStatus: 'Saved',
          itemId: ev['_id']
        });
      });
    })
    .get((req, resp) => {
      resp.status(301).redirect('/events/all');
    });

  eventsRouter.param('id', (req, resp, next, id) => {
    Events.findById(id, '-__v')
      .populate('users')
      .then((ev) => {
        if (!ev)
          return resp.status(404).json({
            operationStatus: `No Event with id: ${id}`
          });
        req.event = ev;
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
    .get((req, resp) => {
      let item = req.event;
      let eventPopUsers = {
        _id: item._id,
        name: item.name,
        startTime: item.startTime,
        endTime: item.endTime,
        users: attachUsers(item)
      }

      resp.status(200).json(eventPopUsers);
    })
    .put((req, resp) => {
      let ev = req.event;
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
          operationStatus: 'Created',
          itemID: ev['_id']
        });
      });
    })
    .delete((req, resp) => {
      Events.findById(req.event['_id'], (err, event) => {
        if (err)
          return resp.status(500).json({
            operationStatus: 'Error deleting Event',
            err: err
          });
        let delEventUsers = event.users;
        console.log('DEL Event USErs are: >>> ' + delEventUsers + ' Of type ' + typeof delEventUsers);

        resp.status(200).json({
          operationStatus: `Event ${event['_id']} removed`
        });

      });
    })
    .patch((req, resp) => {
      let ev = req.event;
      let postedUsers = req.body.users.trim().split(',');
      if (req.body._id)
        delete req.body._id;
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
          operationStatus: 'Item pathed',
          itemID: item['_id']
        });
      });
    });

  app.use('/events', eventsRouter);
}
