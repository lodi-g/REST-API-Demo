const mCustomers = require('./routes/customers');
const oCustomers = require('./routes/customers/orders');
const mOrders = require('./routes/orders');

module.exports = (app) => {
  mCustomers(app);
  oCustomers(app);
  mOrders(app);
};
