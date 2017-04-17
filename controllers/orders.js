const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");

var findAll = (req, res) => {
  Orders.find({}, (err, orders) => {
    if (err)
      return res.status(503).json({});
    return res.status(200).json(orders);
  });
}

var findByCustomer = (req, res) => {
  res.status(200).send({});
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
  findByCustomer,
  create,
  findId,
  updateId,
  patchId,
  deleteId
}
