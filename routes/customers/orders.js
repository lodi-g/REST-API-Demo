const orders = require("../../controllers/orders");

module.exports = (app) => {
  app.route("/customers/:customerId/orders")
    .get(orders.findAll)
    .post(orders.create);

  app.route("/customers/:customerId/orders/:orderId")
    .get(orders.findId)
    .put(orders.updateId)
    .patch(orders.patchId)
    .delete(orders.deleteId);
}
