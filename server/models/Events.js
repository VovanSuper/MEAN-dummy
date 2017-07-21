import autopopulate           from 'mongoose-autopopulate';
import errorHandler           from './plugins/errorHandler';
import { eventInfo }          from './plugins/eventVirts';
import { notEmpty }           from './helpers/validators';
import { preEventRemoveHook } from './plugins/eventHooks';

module.exports = mongoose => {

  let eventShema = new mongoose.Schema({
    name: { type: String, required: true, validate: notEmpty },
    description: String,
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: [], autopopulate: true }]
  });

  eventShema
    .plugin(eventInfo)
    .plugin(errorHandler)
    .plugin(autopopulate)
    .plugin(preEventRemoveHook);

  return mongoose.model('Events', eventShema);
}