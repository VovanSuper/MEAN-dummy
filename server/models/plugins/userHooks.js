// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';

const passHasher = (schema, opts) => {
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

const passValidator = (schema, opts) => {
  schema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
      if (err) return cb(err);
      return cb(null, isMatch);
    })
  }
};

const preUserRemoveHook = function (schema, opts) {
  schema.pre('findByIdAndRemove', preRemoveHook);
  // schema.pre('remove', preRemoveHook);
}

const preRemoveHook = (next) => {
  let self = this;
  self.events.update({ participants: self._id }, {
    $pull: { participants: self._id }
  },
    { multi: true }
  ).exec();
  next();
}


export { passHasher, passValidator, preUserRemoveHook };