const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Candles API
app.get('/api/candles', (req, res) => {
  res.sendFile(path.join(__dirname, '../candles.json'));
});

// Shop API
app.get('/api/shop', (req, res) => {
  res.sendFile(path.join(__dirname, '../shop.json'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});