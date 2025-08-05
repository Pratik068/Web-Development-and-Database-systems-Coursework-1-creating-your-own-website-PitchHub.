// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middleware/authMiddleware');

// Get analytics for logged-in user (entrepreneur)
router.get('/', verifyToken, analyticsController.getUserAnalytics);

module.exports = router;
