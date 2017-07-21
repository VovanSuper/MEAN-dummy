import autopopulate from 'mongoose-autopopulate';
import errorHandler from './plugins/errorHandler';
import { notEmpty, emailValid } from './helpers/validators';
import { passHasher, passValidator, preUserRemoveHook } from './plugins/userHooks';
import { fullName, userInfo } from './plugins/userVirts';

module.exports = mongoose => {
  let userSchema = new mongoose.Schema({
    name: { type: String, required: true, validate: notEmpty },
    username: { type: String, index: { unique: true }, validate: { validator: notEmpty } },
    password: { type: String, required: true, validate: notEmpty },
    email: { type: String, index: { unique: true }, validate: emailValid },
    registered: { type: Date, default: Date.now },
    work_place: { type: String, default: '' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events', default: [], autopopulate: true }]
  });

  userSchema
    .plugin(errorHandler)
    .plugin(passHasher)
    .plugin(passValidator)
    .plugin(fullName)
    .plugin(userInfo)
    .plugin(preUserRemoveHook)
    .plugin(autopopulate)

  return mongoose.model('Users', userSchema);
}
