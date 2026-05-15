const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Candle = require('./models/Candle');
const Shop = require('./models/Shop');

const app = express();
const PORT = 3000;

const MONGODB_URI = 'mongodb+srv://shinesaran0129:smile@vera-candles.2xcxnec.mongodb.net/vera?appName=vera-candles';

app.use(cors());
app.use(express.json());

// MongoDB холбоно
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB холбогдлоо'))
  .catch(err => console.error('❌ Алдаа:', err));

// Candles API
app.get('/api/candles', async (req, res) => {
  const candles = await Candle.find();
  res.json(candles);
});

// Shop API
app.get('/api/shop', async (req, res) => {
  const items = await Shop.find();
  res.json(items);
});

// Нэг candle
app.get('/api/candles/:name', async (req, res) => {
  const candle = await Candle.findOne({ name: req.params.name });
  candle ? res.json(candle) : res.status(404).json({ error: 'Not found' });
});

// Нэг shop item
app.get('/api/shop/:name', async (req, res) => {
  const item = await Shop.findOne({ name: req.params.name });
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});