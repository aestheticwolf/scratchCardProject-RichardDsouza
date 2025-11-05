// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { addTransaction } = require('../controllers/transactionController');

router.post('/', addTransaction); //added here because of crash // alsocehek valid

module.exports = router;