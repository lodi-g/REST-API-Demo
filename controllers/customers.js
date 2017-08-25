const mongoose = require('mongoose');
const errors = require('./errors');

const Customers = mongoose.model('Customers');
const Orders = mongoose.model('Orders');
const ObjectId = mongoose.Types.ObjectId;

const findAll = (req, res) => {
  Customers.find({})
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const createNew = (req, res) => {
  const customer = new Customers({
    _id: new ObjectId(),
    profile: {},
    total_orders: 0,
    total_amount: 0,
    date_added: new Date(),
    orders: [],
  });

  Object.assign(customer.profile, req.body);

  customer.save()
    .then((c) => {
      res.status(201).json(c);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const findById = (req, res) => {
  const customer = req.customer;

  res.status(200).json(customer);
};

const updateById = (req, res) => {
  const customer = req.customer;

  Object.assign(customer.profile, req.body);

  customer.save()
    .then((c) => {
      res.status(200).json(c);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteById = (req, res) => {
  const customer = req.customer;

  customer.remove()
    .then(() => {
      Orders.remove({ customer_id: customer._id })
        .then(() => {
          res.status(204).json();
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const verifyId = (req, res, next) => {
  const id = req.params.customerId;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(errors.oid_invalid);
  }

  Customers.findOne({ _id: id })
    .then((customer) => {
      if (customer === null) {
        return res.status(404).json(errors.oid_notfound);
      }
      req.customer = customer;
      return next();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  findAll,
  createNew,
  findById,
  updateById,
  deleteById,
  verifyId,
};
