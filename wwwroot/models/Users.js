'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import * as bcrypt from 'bcryptjs';
module.exports = function (mongoose) {

  var nonEmpty = function nonEmpty(name) {
    return name.trim().length > 0;
  };
  var emailValid = function emailValid(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.test(pattern);
  };

  var userSchema = new mongoose.Schema({
    name: { type: String, required: true, index: { unique: true }, validate: nonEmpty },
    password: { type: String, required: true, validate: nonEmpty },
    email: { type: String, required: true, unique: true, validate: emailValid },
    registered: { type: Date, default: Date.now },
    work_place: { type: String, default: '' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events', default: [] }]
  });

  userSchema.pre('save', function (next) {
    if (!undefined.isModified('password')) return next();
    _bcrypt2.default.genSalt(10, function (err, salt) {
      if (err) return next(err);
      _bcrypt2.default.hash(undefined.password, salt, function (err, passHashed) {
        if (err) return next(err);
        undefined.password = passHashed;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = function (pass, cb) {
    _bcrypt2.default.compare(pass, undefined.password, function (err, isMatch) {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  };

  return mongoose.model('Users', userSchema);
};