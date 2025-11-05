// models/ScratchCard.js
const mongoose = require('mongoose');

const ScratchCardSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
    required: true
  },
  discountAmount: {
    type: Number,
    required: [true, 'Discount amount is required'],
    min: 0,
    max: 1000
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  isScratched: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ScratchCard', ScratchCardSchema);