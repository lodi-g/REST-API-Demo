const orders = require("../controllers/orders");

module.exports = (app) => {
  app.route("/orders/")
    .get(orders.findAll);

  app.route("/orders/:orderId")
    .get(orders.findId)
    .put(orders.updateId)
    .patch(orders.patchId)
    .delete(orders.deleteId);
}
