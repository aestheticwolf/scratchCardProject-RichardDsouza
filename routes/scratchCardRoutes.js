// routes/scratchCardRoutes.js
const express = require('express');
const router = express.Router();
const { generateScratchCards } = require('../controllers/scratchCardController');

router.post('/generate', generateScratchCards); //generate N scratch cards

module.exports = router;