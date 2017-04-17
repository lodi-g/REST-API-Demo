const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const mongoUri = require("./config/database");
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(mongoUri, (err) => {
  if (err)
    throw new Error(err);
})

mongoose.Promise = Promise;

app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});

require("./models/customers");
require("./models/orders");
require("./routes")(app);

app.listen(port, (err) => {
  if (err)
    throw new Error(err);
  console.log(`Server started on port ${port}`);
});
