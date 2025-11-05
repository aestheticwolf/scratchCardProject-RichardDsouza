// routes/scratchCardRoutes.js
const express = require('express');
const router = express.Router();
const {
  generateScratchCards,
  getUnusedScratchCards
} = require('../controllers/scratchCardController');

router.post('/generate', generateScratchCards); // Generate N scratch cards


router.get('/unused', getUnusedScratchCards);   //you get all unused scratch cards

module.exports = router;