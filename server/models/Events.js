let nameMatch = (name) => {
  return name.trim().length > 0;
}

module.exports = (mongoose) => {  
  return mongoose.model('Events', new mongoose.Schema({
    name      : { type: String, required: true, validate: nameMatch },
    startTime : { type: Date, required: true, default: Date.now },
    endTime   : { type: Date, required: true, default: Date.now },
    users     : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: [] }]
  }));
}
