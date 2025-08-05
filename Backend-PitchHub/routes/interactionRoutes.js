// routes/interactionRoutes.js
const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const { verifyToken } = require('../middleware/authMiddleware');

// Upvote pitch
router.post('/upvote', verifyToken, interactionController.upvotePitch);

// Remove upvote
router.delete('/upvote', verifyToken, interactionController.removeUpvote);

// Get total upvotes for pitch
router.get('/upvote/:pitchId', interactionController.getUpvotes);

// Add comment
router.post('/comment', verifyToken, interactionController.addComment);

// Get comments for pitch
router.get('/comment/:pitchId', interactionController.getComments);

module.exports = router;
