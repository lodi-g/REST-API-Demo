const orders = require('../controllers/orders');

module.exports = (app) => {
  app.route('/orders/')
    .get(orders.findAll);

  app.route('/orders/:orderId')
    .all(orders.verifyId)
    .get(orders.findById)
    .put(orders.updateById)
    .delete(orders.deleteById);
};
