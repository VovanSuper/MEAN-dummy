
const fullName = (schema, opts) => {
  schema.virtual('fullName').get(() => {
    return {
      username: this.username,
      email: this.email
    }
  });
}
const userInfo = (schema, opts) => {
  schema.virtual('userInfo').get(() => {
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