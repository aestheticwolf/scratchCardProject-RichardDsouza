// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/userRoutes');

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Scratch Card API by Richard D\'souza');
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});