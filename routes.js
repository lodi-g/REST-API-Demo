module.exports = (app) => {
  require("./routes/customers")(app);
  require("./routes/customers/orders")(app);
  require("./routes/orders")(app);
}
