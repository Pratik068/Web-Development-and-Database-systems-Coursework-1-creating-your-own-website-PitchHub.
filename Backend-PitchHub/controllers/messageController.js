// controllers/messageController.js
const db = require('../config/db');

// Send a new message
exports.sendMessage = async (req, res) => {
  const senderId = req.user.id;
  const { receiver_id, message } = req.body;

  if (!receiver_id || !message || message.trim() === '') {
    return res.status(400).json({ message: 'Message content is required.' });
  }

  try {
    await db.query(
      'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
      [senderId, receiver_id, message.trim()]
    );

    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get conversation between logged-in user and another user
exports.getConversation = async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.userId;

  try {
    const [messages] = await db.query(
      `SELECT * FROM messages
       WHERE (sender_id = ? AND receiver_id = ?)
          OR (sender_id = ? AND receiver_id = ?)
       ORDER BY sent_at ASC`,
      [userId, otherUserId, otherUserId, userId]
    );

    res.json(messages);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all unique conversations for logged-in user (for inbox listing)
exports.getUserConversations = async (req, res) => {
  const userId = req.user.id;

  try {
    const [conversations] = await db.query(
      `SELECT DISTINCT
        CASE
          WHEN sender_id = ? THEN receiver_id
          ELSE sender_id
        END AS participant_id
       FROM messages
       WHERE sender_id = ? OR receiver_id = ?`,
      [userId, userId, userId]
    );

    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
