const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  _id: { type: Schema.ObjectId, required: true },
  customer_id: { type: Schema.ObjectId, required: true, ref: "Customers" },
  amount: { type: Number, min: 0, required: true },
  type: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  color: { type: String, default: "#fff", required: true },
  date: { type: Date, required: true }
});

mongoose.model("Orders", OrdersSchema);
