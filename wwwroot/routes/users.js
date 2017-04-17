'use strict';

module.exports = function (app) {

  var Users = app.db.models.Users;

  var attachEvents = function attachEvents(user) {
    if (!user) throw Error('Event object is not provided!!!');
    if (!user['events'].length) return [];
    return user['events'].map(function (ev) {
      return {
        _id: ev._id,
        name: ev.name,
        startTime: ev.startTime,
        endTime: ev.endTime
      };
    });
  };

  var usersRouter = require('express').Router();

  usersRouter.route('/all').get(function (req, resp) {
    Users.find({}, '-__v').populate('events').then(function (items) {
      var users = items.map(function (user) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          registered: user.registered,
          work_place: user.work_place,
          events: attachEvents(user)
        };
      });

      resp.status(200).json(users);
    }).catch(function (err) {
      if (err) return resp.status(412).json({
        operationStatus: 'Server error',
        err: err
      });
    });
  });

  usersRouter.route('/').get(function (req, resp) {
    resp.status(301).redirect('/users/all');
  }).post(function (req, resp) {
    var newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      registered: req.body.registered,
      work_place: req.body.work_place
    });

    newUser.save().then(function (item) {
      resp.status(201).json({
        operationStatus: 'Saved',
        item: item
      });
    }).catch(function (err) {
      if (err) return req.status(412).json({
        operationStatus: 'Error trying to save entity',
        err: err
      });
    });
  });

  usersRouter.param('id', function (req, resp, next, id) {
    Users.findById(id, '-__v').populate('events').then(function (user) {
      if (!user) throw 'No user present in database with id of ' + id;

      req.user = user;
      next();
    }).catch(function (err) {
      return resp.status(412).json({
        operationStatus: 'No User with id: ' + id,
        err: err
      });
    });
  }).route('/:id').get(function (req, resp) {
    var usersPopEvents = {
      name: req.user.name,
      email: req.user.email,
      registered: req.user.registered,
      work_place: req.user.work_place,
      event: attachEvents(req.user)
    };
    resp.status(201).json(usersPopEvents);
  }).put(function (req, resp) {
    var user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.work_place = req.body.work_place;

    Users.findByIdAndUpdate(req.user['_id'], {
      $set: {
        name: user.name,
        email: user.email,
        password: user.password,
        work_place: user.work_place
      }
    }, {
      new: true
    }, function (err, user) {
      if (err) return resp.status(500).json({
        operationStatus: 'Error updating user ' + user['_id'],
        err: err
      });
      resp.status(200).json({
        operationStatus: 'Updated user ' + user['_id']
      });
    });
  }).patch(function (req, resp) {
    var user = req.user;
    for (var field in req.body) {
      user[field] = req.body[field];
    }
    user.save().then(function (item) {
      resp.status(201).json({
        operationStatus: 'Patched successfully',
        item: item
      });
    }).catch(function (err) {
      if (err) return req.status(412).json({
        operationStatus: 'Error trying to save entity',
        err: err
      });
    });
  }).delete(function (req, resp) {
    Users.findByIdAndRemove(req.user['_id'], function (err) {
      if (err) return resp.status(500).json({
        operationStatus: 'Error deleting Event',
        err: err
      });
      resp.status(200).json({
        operationStatus: 'User ' + req.user['_id'] + ' removed'
      });
    });
  });

  app.use('/users', usersRouter);
};