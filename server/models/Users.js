import bcrypt from 'bcrypt';
//import * as bcrypt from 'bcryptjs';
module.exports = (mongoose) => {

  let nonEmpty = (name) => {
    return name.trim().length > 0;
  };
  let emailValid = (email) => {
    let pattern = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.test(pattern);
  };

  let userSchema = new mongoose.Schema({
    name       : { type: String, required: true, index: { unique: true }, validate: nonEmpty },
    password   : { type: String, required: true, validate: nonEmpty },
    email      : { type: String, required: true, unique: true, validate: emailValid },
    registered : { type: Date, default: Date.now },
    work_place : { type: String, default: '' },
    events     : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events', default: [] }]
  });

  userSchema.pre('save', next => {
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, passHashed) => {
        if (err) return next(err);
        this.password = passHashed;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = (pass, cb) => {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    })
  }

  return mongoose.model('Users', userSchema);
}
