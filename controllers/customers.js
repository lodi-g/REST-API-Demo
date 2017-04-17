const mongoose = require("mongoose");
const Customers = mongoose.model("Customers");

var findAll = (req, res) => {
  Customers.find({}, (err, customers) => {
    if (err)
      return res.status(503).json({});
    return res.status(200).json(customers);
  });
}

var create = (req, res) => {
  res.status(200).send({});
}

var findId = (req, res) => {
  res.status(200).send({});
}

var updateId = (req, res) => {
  res.status(200).send({});
}

var patchId = (req, res) => {
  res.status(200).send({});
}

var deleteId = (req, res) => {
  res.status(200).send({});
}

module.exports = {
  findAll,
  create,
  findId,
  updateId,
  patchId,
  deleteId
}
