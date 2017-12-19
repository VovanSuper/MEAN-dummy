// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';

const passHasher = function (schema, opts) {
  schema.pre('save', function (next) {
    let self = this;
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(self.password, salt, function (err, passHashed) {
        if (err) return next(err);
        self.password = passHashed;
        next();
      });
    });
  });
};

const upsertUser = function (schema, opts) {
  schema.methods.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
      'facebookProvider.id': profile.id
    }, function (err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newUser.save(function (error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };
}

const passValidator = function (schema, opts) {
  schema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
      if (err) return cb(err);
      return cb(null, isMatch);
    })
  }
};

const preUserRemoveHook = function (schema, opts) {
  schema.pre('findByIdAndRemove', preRemoveHook);
  schema.pre('remove', preRemoveHook);
}

const preRemoveHook = function (next) {
  let self = this;
  self.events.update({ participants: self._id }, {
    $pull: { participants: self._id }
  },
    { multi: true }
  ).exec();
  next();
}


export { passHasher, passValidator, upsertUser, preUserRemoveHook };