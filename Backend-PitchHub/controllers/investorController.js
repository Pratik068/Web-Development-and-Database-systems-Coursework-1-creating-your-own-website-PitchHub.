// controllers/investorController.js
const db = require('../config/db');

// List investors with optional filters
exports.getInvestors = async (req, res) => {
  const { industry_preference, funding_min, funding_max, location, keyword } = req.query;

  try {
    let sql = `SELECT u.id, u.name, u.email, ip.industry_preference, ip.funding_min, ip.funding_max, ip.location, ip.bio
               FROM users u
               LEFT JOIN investor_profiles ip ON u.id = ip.user_id
               WHERE u.role = 'investor'`;
    const params = [];

    if (industry_preference) {
      sql += ' AND ip.industry_preference = ?';
      params.push(industry_preference);
    }
    if (funding_min) {
      sql += ' AND ip.funding_min >= ?';
      params.push(funding_min);
    }
    if (funding_max) {
      sql += ' AND ip.funding_max <= ?';
      params.push(funding_max);
    }
    if (location) {
      sql += ' AND ip.location LIKE ?';
      params.push(`%${location}%`);
    }
    if (keyword) {
      sql += ' AND (u.name LIKE ? OR ip.bio LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get investor profile by ID
exports.getInvestorById = async (req, res) => {
  const investorId = req.params.id;

  try {
    const sql = `SELECT u.id, u.name, u.email, ip.industry_preference, ip.funding_min, ip.funding_max, ip.location, ip.bio
                 FROM users u
                 LEFT JOIN investor_profiles ip ON u.id = ip.user_id
                 WHERE u.role = 'investor' AND u.id = ?`;
    const [rows] = await db.query(sql, [investorId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching investor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
