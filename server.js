const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const errors = require('./controllers/errors');
const mongoUri = require('./config/database');

const app = express();
const port = 3000;

mongoose.Promise = Promise;

mongoose.connect(mongoUri, { useMongoClient: true })
  .catch((err) => {
    throw new Error(err);
  });

app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json(errors.json_invalid);
  } else if (err) {
    return res.status(500).json(err);
  }
  return next();
});

if (process.env.NODE_ENV !== 'testing')
  app.use(morgan('dev'));

app.use((req, res, next) => {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});

require('./models/customers');
require('./models/orders');
require('./routes')(app);

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server started on port ${port}`);
});

module.exports = app;