module.exports = app => {
  let Handler = app.utils.Handlers;

  return (Entity, childCollNameToPop) => (req, resp, next, id) => {
    return Entity.findById(id, '-__v')
      .populate(childCollNameToPop)
      .then(item => {
        if (!item) throw new Error(`No Item with id: ${id}`);

        switch (Entity.collection.collectionName) {
          case 'events':
            resp.locals.event = item;
            break;
          case 'users':
            resp.locals.user = item;
            break;
          default:
            resp.locals.unknown = item || undefined;
            break;
        }
        return next();
      })
      .catch(err => Handler.Error(resp, 422, err, `Failed to find item with id ${id}`));
  }
}