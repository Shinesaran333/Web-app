const mongoose = require('mongoose');

const candleSchema = new mongoose.Schema({
  name: String,
  scent: String,
  desc: String,
  price: Number,
  tag: String,
  img: String
});

module.exports = mongoose.model('Candle', candleSchema);