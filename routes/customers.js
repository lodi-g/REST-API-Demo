const customers = require("../controllers/customers");

module.exports = (app) => {

  app.route("/customers")
    .get(customers.findAll)
    .post(customers.create);

  app.route("/customers/:customerId")
    .get(customers.findId)
    .put(customers.updateId)
    .patch(customers.patchId)
    .delete(customers.deleteId);
}
