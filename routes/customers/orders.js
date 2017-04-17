const orders = require("../../controllers/orders");

module.exports = (app) => {
  app.route("/customers/:customerId/orders")
    .get(orders.findByCustomer)
    .post(orders.create);
}
