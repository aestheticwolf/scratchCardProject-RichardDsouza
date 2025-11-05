// controllers/scratchCardController.js
const ScratchCard = require('../models/ScratchCard');

//Here it generate N new scratch cards
exports.generateScratchCards = async (req, res) => {
  const { numberOfScratchCards } = req.body;

  //Here it validate input
  if (!numberOfScratchCards || numberOfScratchCards <= 0) {
    return res.status(400).json({ success: false, error: 'Number of scratch cards must be positive' });
  }

  try {
    //it count unused active scratch cards
    const unusedCount = await ScratchCard.countDocuments({
      isScratched: false,
      isActive: true,
      expiryDate: { $gt: new Date() }
    });

    //this one if enough unused cards exist, return message and don't create new ones
    if (unusedCount >= numberOfScratchCards) {
      return res.status(200).json({
        success: true,
        message: `${unusedCount} number of active scratch cards still exists in the DB. Did not create any new scratch cards`
      });
    }

    //Generate new scratch cards
    const newCards = [];
    for (let i = 0; i < numberOfScratchCards; i++) {
      const discountAmount = Math.floor(Math.random() * 1001); //0 to 1000
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 5); //MNade 5 days from now

      const card = new ScratchCard({
        discountAmount,
        expiryDate,
        isScratched: false,
        isActive: true
      });

      await card.save();
      newCards.push(card);
    }

    res.status(201).json({
      success: true,
      count: newCards.length,
      data: newCards
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//Added function to existing controller
exports.getUnusedScratchCards = async (req, res) => {
  try {
    const unusedCards = await ScratchCard.find({
      isScratched: false,
      isActive: true,
      expiryDate: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: unusedCards.length,
      data: unusedCards
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};