const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");

var findAll = (req, res) => {
  Orders.find({})
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(503).json(err);
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
