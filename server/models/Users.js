//import bcrypt from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
module.exports = (mongoose) => {

  let nonEmpty = (name) => {
    return name.trim().length > 0;
  };
  let emailValid = (email) => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    return pattern.test(email);
  };

  let userSchema = new mongoose.Schema({
    name: { type: String, required: true, validate: nonEmpty },
    username: { type: String, index: { unique: true }, validate: { validator: nonEmpty } },
    password: { type: String, required: true, validate: nonEmpty },
    email: { type: String, index: { unique: true }, validate: emailValid },
    registered: { type: Date, default: Date.now },
    work_place: { type: String, default: '' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events', default: [] }]
  });

  userSchema.virtual('fullName').get(() => {
    return {
      username: this.username,
      email: this.email
    }
  });

  userSchema.virtual('userInfo').get(() => {
    return {
      _id: this._id,
      name: this.name,
      username: this.username,
      email: this.email,
      registered: this.registered,
      work_place: this.work_place,
      events: this.events
    }
  });

  userSchema.pre('save', function (next) {
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

  userSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
      if (err) return cb(err);
      return cb(null, isMatch);
    })
  }

  return mongoose.model('Users', userSchema);
}
