module.exports = app => {
  let Events = app.db.models.Events;
  let retEvent = app.utils.Helpers.retEventJson;
  let splitSubParams = app.utils.Helpers.splitSubParams;
  let Handler = app.utils.Handlers;
  let idParamHandler = app.middlewares.IdParamHandler;

  const eventsRouter = require('express').Router();

  eventsRouter.route('/all')
    .get((req, resp) => {
      Events.find({}, '-__v')
        .populate('Users')
        .then((events) => {
          return Handler.Ok(resp, 200, events.map(retEvent), 'Found');
        })
        .catch((err) => {
          return Handler.Error(resp, 404, err, 'Not found');
        });
    });

  eventsRouter.route('/')
    .get((req, resp) => {
      resp.status(301).redirect('/events/all');
    })

    .post((req, resp) => {
      // console.log(`\nPOST DONE ${req.body} type is: ${typeof req.body} `)
      
      let postedUsers = splitSubParams(req.body.participants);
      console.log(`\nPOST DONE users : ${postedUsers} type is: ${typeof postedUsers} `)
      let newEvent = new Events({
        name: req.body.name,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        createdAt: req.body.createdAt,
        createdBy: req.body.createdBy,
        participants: postedUsers
      });
      console.log(`\nPOST DONE newEvent : ${newEvent} type is: ${typeof newEvent} `)

      newEvent.save().then((evnt) => {
        if (!evnt) throw 'Error while saving event';
        return Handler.Ok(resp, 201, retEvent(evnt), `Created event id ${evnt['_id']}`);
      })
        .catch((err) => {
          return Handler.Error(resp, 412, err, `Error trying to save event: ${err.toString()}`);
        });
    });

  eventsRouter
    .param('id', idParamHandler(Events, 'users'))
    .route('/:id')
    .get((req, resp) => {
      return Handler.Ok(resp, 200, retEvent(resp.locals.event), 'Found');
    })

    // .use( passport.authenticate('jwtAuth
    .put((req, resp) => {
      let event = resp.locals.event;
      let postedUsers = splitSubParams(req.body.participants);
      event.name = req.body.name || '';
      event.startTime = req.body.startTime || resp.locals.event.startTime;
      event.endTime = req.body.endTime || resp.locals.event.endTime;
      event.createdAt = req.body.createdAt || resp.locals.event.createdAt;
      event.createdBy = req.body.createdBy || resp.locals.event.createdBy
      event.participants = postedUsers
      event.markModified('participants');

      event.save().then((evnt) => {
        if (!evnt) throw 'Erro while modifying event';
        return Handler.Ok(resp, 200, retEvent(evnt), `Modified event id ${evnt['_id']}`);
      })
        .catch((err) => {
          return Handler.Error(resp, 412, err, `Error updatong event id ${event['_id']}`);
        });
    })

    .patch((req, resp) => {
      let event = resp.locals.event;
      req.body.participants = splitSubParams(req.body.participants);

      for (let key in req.body)
        event[key] = req.body[key];
      event.markModified('participants');

      event.save().then((evnt) => {
        if (!evnt) throw 'Error while pathcing event';
        return Handler.Ok(resp, 200, retEvent(evnt), `Patched event id ${evnt['_id']}`);
      })
        .catch((err) => {
          return Handler.Error(resp, 412, err, `Error pathching event id ${event['_id']}`);
        });
    })

    .delete((req, resp) => {
      let evId = resp.locals.event['_id'];
      Events.findByIdAndRemove(evId).exec().then((res) => {
        
        
        return Handler.Ok(resp, 202, null, `Removed event id ${evId}`);
      })
        .catch(err => { return Handler.Error(resp, 500, err, `Error deleting event ${evId}`) })
    });

  app.use('/events', eventsRouter);
}
