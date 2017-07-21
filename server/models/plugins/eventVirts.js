
const eventInfo = (schema, opts) => {
  schema.virtual('eventInfo').get(() => {
    return {
      id: this._id,
      name: this.name,
      desc: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      registeredAt: this.registeredAt,
      registeredBy: this.registeredBy,
      place: this.place,
      participants: this.participants
    }
  });
}


export { eventInfo }