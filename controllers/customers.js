const mongoose = require("mongoose");
const util = require("util");
const errors = require("./errors");
const Customers = mongoose.model("Customers");
const Orders = mongoose.model("Orders");
const objectId = mongoose.Types.ObjectId;

var findAll = (req, res) => {
  Customers.find({})
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

var createNew = (req, res) => {
  const customer = new Customers({
    _id: new objectId,
    profile: {},
    total_orders: 0,
    total_amount: 0,
    orders: []
  });

  customer.profile = util._extend(customer.profile, req.body);

  customer.save()
    .then((customer) => {
      res.status(201).json(customer);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var findById = (req, res) => {
  const customer = req.customer;

  res.status(200).json(customer);
}

var updateById = (req, res) => {
  const customer = req.customer;

  customer.profile = util._extend(customer.profile, req.body);

  customer.save()
    .then((customer) => {
      res.status(200).json(customer);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var deleteById = (req, res) => {
  const customer = req.customer;

  customer.remove()
    .then(() => {
      Orders.remove({ customer_id: customer._id })
        .then(() => {
          res.status(204).json();
        })
        .catch((err) => {
          res.status(400).json(err);
        })
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

var verifyId = (req, res, next) => {
  let id = req.params.customerId;

  if (!objectId.isValid(id))
    return res.status(400).json(errors.oid_invalid);

  Customers.findOne({ _id: id })
    .then((customer) => {
      if (customer === null)
        return res.status(404).json(errors.oid_notfound);
      req.customer = customer;
      next()
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  findAll,
  createNew,
  findById,
  updateById,
  deleteById,
  verifyId
}
