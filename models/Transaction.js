// models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
    required: true
  },
  dateOfTransaction: {
    type: Date,
    default: Date.now
  },
  transactionAmount: {
    type: Number,
    required: [true, 'Transaction amount is required']
  },
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  scratchCardId: {
    type: String,
    required: [true, 'Scratch card ID is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);