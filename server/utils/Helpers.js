
module.exports = app => {

  let Users = app.db.models.Users;

  const attachParticipantsToEvent = event => {
    return (event['participants']).map(u => {
      return {
        id: u['_id'],
        name: u.name,
        username: u.username,
        email: u.email,
        registered: u.registered,
        work_place: u.work_place
      }
    });
  }

  const attachEventsToUser = user => {
    return (user['events']).map(ev => {
      return {
        id: ev['_id'],
        name: ev.name,
        startTime: ev.startTime,
        endTime: ev.endTime
      }
    });
  }

  const retEventJson = event => {
    return {
      id: event['_id'],
      name: event.name,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      createdAt: event.createdAt,
      createdBy: event.createdBy,
      participants: attachParticipantsToEvent(event)
    }
  }

  const retUserJson = user => {
    return {
      id: user['_id'],
      name: user.name,
      username: user.username,
      email: user.email,
      registered: user.registered,
      work_place: user.work_place,
      events: attachEventsToUser(user)
    }
  }

  const updateUsersForEventInDb = (postUId, event, resp) => {
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

  const splitSubParams = params => {
    console.log('PARAMS ::::\n');
    console.dir(params);

    return (params && params.lenght > 0) ? (Array.isArray(params) ? [...params] : params) : [];
  }

  return {
    retEventJson: retEventJson,
    retUserJson: retUserJson,
    splitSubParams: splitSubParams
  }
}