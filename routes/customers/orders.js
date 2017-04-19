const orders = require("../../controllers/orders");
const customers = require("../../controllers/customers");

module.exports = (app) => {
  app.route("/customers/:customerId/orders")
    .all(customers.verifyId)
    .get(orders.findByCustomer)
    .post(orders.createNew);
}
