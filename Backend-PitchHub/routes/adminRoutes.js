// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authenticateToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Protect all admin routes with authentication + admin check
router.use(authenticateToken, verifyAdmin);

router.put('/pitches/:pitchId/status', adminController.updatePitchStatus);

// Get all pending pitches
router.get('/pending-pitches', adminController.getAllPitches);

module.exports = router;
