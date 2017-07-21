const preEventRemoveHook = function (schema, opts) {
  schema.pre('findByIdAndRemove', preRemoveHook);
  // schema.pre('remove', preRemoveHook);
}

const preRemoveHook = (next) => {
  let self = this;
  self.participants.update({ events: self._id }, {
    $pull: { events: self._id }
  },
    { multi: true }
  ).exec();
  next();
}

export { preEventRemoveHook }