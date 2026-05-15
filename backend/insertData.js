const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Candle = require('./models/Candle');
const Shop = require('./models/Shop');

const MONGODB_URI = 'mongodb+srv://shinesaran0129:smile@vera-candles.2xcxnec.mongodb.net/vera?appName=vera-candles';

const candleData = JSON.parse(fs.readFileSync(path.join(__dirname, '../candles.json')));
const shopData = JSON.parse(fs.readFileSync(path.join(__dirname, '../shop.json')));

const seedDB = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB холбогдлоо');

  await Candle.deleteMany({});
  await Shop.deleteMany({});

  await Candle.insertMany(candleData);
  await Shop.insertMany(shopData);

  console.log('✅ Дата DB-д орлоо!');
  mongoose.connection.close();
};

seedDB();