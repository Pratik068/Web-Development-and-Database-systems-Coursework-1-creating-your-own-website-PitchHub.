// routes/investorRoutes.js
const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public route to get investors with filters
router.get('/', investorController.getInvestors);

// Get single investor by ID
router.get('/:id', investorController.getInvestorById);

module.exports = router;
