const routes = {
  customers: require("./routes/customers"),
  orders: require("./routes/customers/orders")
}

module.exports = (app) => {
  require("./routes/customers")(app);
  require("./routes/customers/orders")(app);
}
