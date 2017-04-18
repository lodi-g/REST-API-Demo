const mongoose = require("mongoose");
const errors = require("./errors");
const Customers = mongoose.model("Customers");
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

var create = (req, res) => {
  let customer = new Customers({
    _id: new objectId,
    profile: {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        age: req.body.age,
        address: req.body.address,
        post_code: req.body.post_code,
        city: req.body.city,
        phone: req.body.phone,
        color: req.body.color
      },
    total_orders: 0,
    total_amount: 0,
    orders: []
  });

  customer.save()
    .then((customer) => {
      res.status(201).json(customer);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

var findId = (req, res) => {
  let id = req.params.customerId;

  if (!objectId.isValid(id))
    return res.status(400).json(errors.oid_invalid);

  Customers.findOne({ _id: id })
    .then((customer) => {
      if (customer === null)
        return res.status(404).json(errors.oid_notfound);
      res.status(200).json(customer);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

var updateId = (req, res) => {
  let id = req.params.customerId;

  if (!objectId.isValid(id))
    return res.status(400).json(errors.oid_invalid);

  let query = { _id: id };
  Customers.findOneAndUpdate(query, req.body, { new: true })
    .then((customer) => {
      if (customer === null)
        return res.status(404).json(errors.oid_notfound);
      res.status(200).json(customer);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
}

var deleteId = (req, res) => {
  let id = req.params.customerId;

  if (!objectId.isValid(id))
    return res.status(400).json(errors.oid_invalid);

  Customers.remove({ _id: id })
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = {
  findAll,
  create,
  findId,
  updateId,
  deleteId
}
