// controllers/interactionController.js
const db = require('../config/db');

// Add upvote
exports.upvotePitch = async (req, res) => {
  const userId = req.user.id;
  const { pitch_id } = req.body;

  if (!pitch_id) {
    return res.status(400).json({ message: 'Pitch ID is required' });
  }

  try {
    // Insert upvote, ignore duplicates
    await db.query(
      `INSERT IGNORE INTO upvotes (user_id, pitch_id) VALUES (?, ?)`,
      [userId, pitch_id]
    );

    res.json({ message: 'Upvoted successfully' });
  } catch (error) {
    console.error('Error upvoting pitch:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove upvote
exports.removeUpvote = async (req, res) => {
  const userId = req.user.id;
  const { pitch_id } = req.body;

  if (!pitch_id) {
    return res.status(400).json({ message: 'Pitch ID is required' });
  }

  try {
    await db.query(
      `DELETE FROM upvotes WHERE user_id = ? AND pitch_id = ?`,
      [userId, pitch_id]
    );

    res.json({ message: 'Upvote removed' });
  } catch (error) {
    console.error('Error removing upvote:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get total upvotes for a pitch
exports.getUpvotes = async (req, res) => {
  const pitchId = req.params.pitchId;

  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS total_upvotes FROM upvotes WHERE pitch_id = ?`,
      [pitchId]
    );

    res.json({ total_upvotes: rows[0].total_upvotes });
  } catch (error) {
    console.error('Error fetching upvotes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  const userId = req.user.id;
  const { pitch_id, comment } = req.body;

  if (!pitch_id || !comment) {
    return res.status(400).json({ message: 'Pitch ID and comment are required' });
  }

  try {
    await db.query(
      `INSERT INTO comments (user_id, pitch_id, comment) VALUES (?, ?, ?)`,
      [userId, pitch_id, comment]
    );

    res.status(201).json({ message: 'Comment added' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments for a pitch
exports.getComments = async (req, res) => {
  const pitchId = req.params.pitchId;

  try {
    const [rows] = await db.query(
      `SELECT c.id, c.comment, c.timestamp, u.id AS user_id, u.name AS user_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.pitch_id = ?
       ORDER BY c.timestamp DESC`,
      [pitchId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
