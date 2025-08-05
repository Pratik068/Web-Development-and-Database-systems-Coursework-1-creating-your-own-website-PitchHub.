// controllers/analyticsController.js
const db = require('../config/db');

exports.getUserAnalytics = async (req, res) => {
  const userId = req.user.id;

  try {
    // Total pitches by user
    const [pitchCountRows] = await db.query(
      `SELECT COUNT(*) AS total_pitches FROM pitches WHERE user_id = ?`,
      [userId]
    );
    const totalPitches = pitchCountRows[0].total_pitches;

    // Total upvotes on all user's pitches
    const [upvoteRows] = await db.query(
      `SELECT COUNT(*) AS total_upvotes
       FROM upvotes
       WHERE pitch_id IN (SELECT id FROM pitches WHERE user_id = ?)`,
      [userId]
    );
    const totalUpvotes = upvoteRows[0].total_upvotes;

    // Total comments on all user's pitches
    const [commentRows] = await db.query(
      `SELECT COUNT(*) AS total_comments
       FROM comments
       WHERE pitch_id IN (SELECT id FROM pitches WHERE user_id = ?)`,
      [userId]
    );
    const totalComments = commentRows[0].total_comments;

    // Per pitch breakdown
    const [pitchStats] = await db.query(
      `SELECT 
         p.id, p.title,
         (SELECT COUNT(*) FROM upvotes u WHERE u.pitch_id = p.id) AS upvotes,
         (SELECT COUNT(*) FROM comments c WHERE c.pitch_id = p.id) AS comments
       FROM pitches p
       WHERE p.user_id = ?`,
      [userId]
    );

    res.json({
      total_pitches: totalPitches,
      total_upvotes: totalUpvotes,
      total_comments: totalComments,
      pitch_stats: pitchStats
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
