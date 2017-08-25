const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomersSchema = new Schema({
  _id: Schema.ObjectId,
  profile: {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    age: { type: Number, min: 0, max: 150 },
    address: { type: String, trim: true },
    post_code: { type: String, trim: true },
    city: { type: String, trim: true },
    phone: { type: String, trim: true },
    color: { type: String, trim: true, default: '#fff' },
  },
  total_orders: { type: Number, default: 0, min: 0 },
  total_amount: { type: Number, default: 0, min: 0 },
  date_added: { type: Date },
  orders: [{
    type: Schema.ObjectId,
    ref: 'Orders',
  }],
});

module.exports = mongoose.model('Customers', CustomersSchema);
