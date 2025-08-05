// controllers/adminController.js
const db = require('../config/db');

// Get all pitches with user info
exports.getAllPitches = async (req, res) => {
  try {
    const [pitches] = await db.query(`
      SELECT pitches.*, users.name AS user_name, users.email 
      FROM pitches 
      JOIN users ON pitches.user_id = users.id
      ORDER BY pitches.created_at DESC
    `);
    res.json(pitches);
  } catch (error) {
    console.error('Error fetching pitches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve or reject pitch
exports.updatePitchStatus = async (req, res) => {
  const { pitchId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    await db.query(`UPDATE pitches SET status = ? WHERE id = ?`, [status, pitchId]);
    res.json({ message: `Pitch ${status}` });
  } catch (error) {
    console.error('Error updating pitch status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional: Delete pitch
exports.deletePitch = async (req, res) => {
  const { pitchId } = req.params;

  try {
    await db.query(`DELETE FROM pitches WHERE id = ?`, [pitchId]);
    res.json({ message: 'Pitch deleted successfully' });
  } catch (error) {
    console.error('Error deleting pitch:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
