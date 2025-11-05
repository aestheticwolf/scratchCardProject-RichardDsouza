// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const scratchCardRoutes = require('./routes/scratchCardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/scratchcards', scratchCardRoutes);
app.use('/api/transactions', transactionRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Scratch Card API by Richard D\'souza');
});

//Health check for frontend end point which is task 6
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Scratch Card API is running',
    timestamp: new Date().toISOString()
  });
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});