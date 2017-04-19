const customers = require("../controllers/customers");

module.exports = (app) => {

  app.route("/customers")
    .get(customers.findAll)
    .post(customers.createNew);

  app.route("/customers/:customerId")
    .all(customers.verifyId)
    .get(customers.findById)
    .put(customers.updateById)
    .delete(customers.deleteById);
}
