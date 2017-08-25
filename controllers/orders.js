const mongoose = require('mongoose');
const errors = require('./errors');

const Orders = mongoose.model('Orders');
const ObjectId = mongoose.Types.ObjectId;

const findAll = (req, res) => {
  Orders.find({})
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const findByCustomer = (req, res) => {
  const customer = req.customer;

  Orders.find({ customer_id: customer._id })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const createNew = (req, res) => {
  const customer = req.customer;
  const order = new Orders({
    _id: new ObjectId(),
    customer_id: customer.id,
    amount: req.body.amount,
    type: req.body.type,
    description: req.body.description,
    date: new Date(),
    color: req.body.color,
  });

  customer.orders.push(order._id);
  customer.total_orders += 1;
  customer.total_amount += order.amount;
  order.save()
    .then((o) => {
      customer.save()
        .then(() => {
          res.status(200).json(o);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const findById = (req, res) => {
  const order = req.order;

  res.status(200).json(order);
};

const updateById = (req, res) => {
  const order = req.order;

  Object.assign(order, req.body);

  order.save()
    .then((o) => {
      res.status(200).json(o);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteById = (req, res) => {
  const order = req.order;

  order.remove()
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const verifyId = (req, res, next) => {
  const id = req.params.orderId;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(errors.oid_invalid);
  }

  Orders.findOne({ _id: id })
    .then((order) => {
      if (order === null) {
        return res.status(404).json(errors.oid_notfound);
      }
      req.order = order;
      return next();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  findAll,
  findByCustomer,
  createNew,
  findById,
  updateById,
  deleteById,
  verifyId,
};
