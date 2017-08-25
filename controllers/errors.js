module.exports = {
  oid_invalid: {
    error: 'ObjectIdException',
    message: 'The provided ObjectId is not a valid ObjectId',
  },
  oid_notfound: {
    error: 'ObjectIdException',
    message: 'The provided ObjectId was not found',
  },
  json_invalid: {
    error: 'SyntaxError',
    message: 'Failed to parse JSON',
  },
};
