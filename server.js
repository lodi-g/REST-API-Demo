const express = require("express");
const morgan = require("morgan");
const app = express();

const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});

require("./routes")(app);

app.listen(port, (err) => {
  if (err)
    throw new Error(err);
  console.log(`Server started on port ${port}`);
});
