const mongoose = require("mongoose");
const errors = require("./errors");
const Orders = mongoose.model("Orders");
const objectId = mongoose.Types.ObjectId;

var findAll = (req, res) => {
  Orders.find({})
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

var findByCustomer = (req, res) => {
  const customer = req.customer;

  Orders.find({ customer_id: customer._id })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var createNew = (req, res) => {
  const customer = req.customer;
  const order = new Orders({
    _id: new objectId,
    customer_id: customer.id,
    amount: req.body.amount,
    type: req.body.type,
    description: req.body.description,
    date: new Date(),
    color: req.body.color
  });

  customer.orders.push(order._id);
  order.save()
    .then((order) => {
      customer.save()
        .then(() => {
          res.status(200).json(order);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var findById = (req, res) => {
  const order = req.order;

  res.status(200).json(order);
}

var updateById = (req, res) => {
  const order = req.order;

  Object.assign(order, req.body);

  order.save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var deleteById = (req, res) => {
  const order = req.order;

  order.remove()
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var verifyId = (req, res, next) => {
  const id = req.params.orderId;

  if (!objectId.isValid(id))
    return res.status(400).json(errors.oid_invalid);

  Orders.findOne({ _id: id })
    .then((order) => {
      if (order === null)
        return res.status(404).json(errors.oid_notfound);
      req.order = order;
      next()
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  findAll,
  findByCustomer,
  createNew,
  findById,
  updateById,
  deleteById,
  verifyId
}
