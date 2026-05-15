const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  img: String
});

module.exports = mongoose.model('Shop', shopSchema);