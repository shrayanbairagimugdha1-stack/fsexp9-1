const express = require('express');
const path = require('path');
const { calculate } = require('./calculator');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.post('/api/calculate', (req, res) => {
  try {
    const { a, operator, b } = req.body;
    res.json({ result: calculate(a, operator, b) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = app;