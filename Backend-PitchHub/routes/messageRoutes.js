// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { verifyToken } = require('../middleware/authMiddleware');

// Send a message
router.post('/send', verifyToken, messageController.sendMessage);

// Get conversation with another user
router.get('/conversation/:userId', verifyToken, messageController.getConversation);

// Get all unique conversations
router.get('/conversations', verifyToken, messageController.getUserConversations);

module.exports = router;
