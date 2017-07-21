
const fullName = function (schema, opts) {
  schema.virtual('fullName').get(function () {
    return {
      username: this.username,
      email: this.email
    }
  });
}
const userInfo = function (schema, opts) {
  schema.virtual('userInfo').get(function () {
    return {
      id: this._id,
      name: this.name,
      username: this.username,
      email: this.email,
      registered: this.registered,
      work_place: this.work_place,
      events: this.events
    }
  });
}


export { fullName, userInfo }