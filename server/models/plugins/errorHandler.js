
export default function (schema, opts) {
  schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Item with this key already exists in database -- MongoDb[11000]Duplicate key'));
    } else {
      next(error);
    }
  });
}