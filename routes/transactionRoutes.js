// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions
} = require('../controllers/transactionController');

router.post('/', addTransaction); // Add transaction
router.get('/', getTransactions); //added task 5

module.exports = router;