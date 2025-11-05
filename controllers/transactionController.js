// controllers/transactionController.js
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const ScratchCard = require('../models/ScratchCard');

//Add a new transaction
exports.addTransaction = async (req, res) => {
  const { userId, scratchCardId, transactionAmount } = req.body;

  //Validate required fields
  if (!userId || !scratchCardId || transactionAmount == null) {
    return res.status(400).json({ success: false, error: 'userId, scratchCardId, and transactionAmount are required' });
  }

  try {
    //Check if user exists
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Check if scratch card exists
    const scratchCard = await ScratchCard.findOne({ id: scratchCardId });
    if (!scratchCard) {
      return res.status(404).json({ success: false, error: 'Scratch card not found' });
    }

    //Check if already scratched
    if (scratchCard.isScratched) {
      return res.status(400).json({ success: false, error: 'Scratch card is already used' });
    }

    //Check if expired
    if (scratchCard.expiryDate < new Date()) {
      return res.status(400).json({ success: false, error: 'Scratch card has expired' });
    }

    //Check if inactive
    if (!scratchCard.isActive) {
      return res.status(400).json({ success: false, error: 'Scratch card is inactive' });
    }

    //Create transaction
    const transaction = await Transaction.create({
      transactionAmount,
      userId,
      scratchCardId
    });

    //Mark card as used
    scratchCard.isScratched = true;
    await scratchCard.save();

    res.status(201).json({ success: true, data: transaction });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//added this funtion during task 5 where  this function to existing controller
exports.getTransactions = async (req, res) => {
  try {
    let query = {};

    //Filter by dateOfTransaction (exact date)
    if (req.query.dateOfTransaction) {
      const date = new Date(req.query.dateOfTransaction);
      if (!isNaN(date)) {
        query.dateOfTransaction = {
          $gte: new Date(date.setHours(0, 0, 0, 0)),
          $lt: new Date(date.setHours(23, 59, 59, 999))
        };
      }
    }

    //Filter by userId
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    //Filter by transactionAmount
    if (req.query.transactionAmount) {
      query.transactionAmount = parseFloat(req.query.transactionAmount);
    }

    const transactions = await Transaction.find(query);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};