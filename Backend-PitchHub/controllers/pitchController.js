// controllers/pitchController.js
const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// Submit pitch with file (from /submit route)
exports.submitPitch = async (req, res) => {
  const userId = req.user.id; // Assuming verifyToken sets req.user
  const { title, description, category, video_url } = req.body;
  const pitchDeck = req.file ? req.file.filename : null;

  try {
    const query = `
      INSERT INTO pitches (user_id, title, description, category, pitch_deck, video_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [userId, title, description, category, pitchDeck, video_url];

    await db.query(query, values);
    res.status(201).json({ message: 'Pitch submitted successfully' });
  } catch (error) {
    console.error('Error submitting pitch:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create pitch without file upload (Authenticated users)
exports.createPitch = async (req, res) => {
  const userId = req.user.id; // Get user ID from JWT token
  const { title, description, category, pitch_deck_url } = req.body;

  try {
    const query = `
      INSERT INTO pitches (user_id, title, description, category, pitch_deck_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [userId, title, description, category, pitch_deck_url || null];

    const [result] = await db.query(query, values);
    
    // Return the created pitch with its ID
    const createdPitch = {
      id: result.insertId,
      user_id: userId,
      title,
      description,
      category,
      pitch_deck_url: pitch_deck_url || null,
      views: 0,
      likes: 0,
      investors: 0, // Map to investors for frontend
      created_at: new Date().toISOString()
    };

    res.status(201).json(createdPitch);
  } catch (error) {
    console.error('Error creating pitch:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all pitches (with optional filters)
exports.getAllPitches = async (req, res) => {
  const { category } = req.query;

  try {
    let query = 'SELECT * FROM pitches';
    const values = [];

    if (category) {
      query += ' WHERE category = ?';
      values.push(category);
    }

    const [rows] = await db.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching pitches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pitch by ID
exports.getPitchById = async (req, res) => {
  const pitchId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM pitches WHERE id = ?', [pitchId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pitch not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching pitch by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's pitches
exports.getUserPitches = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query('SELECT * FROM pitches WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    
    // Transform the data to match frontend expectations
    const transformedPitches = rows.map(pitch => ({
      ...pitch,
      investors: pitch.investors_reached || 0 // Map investors_reached to investors for frontend
    }));
    
    res.status(200).json(transformedPitches);
  } catch (error) {
    console.error('Error fetching user pitches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete pitch (only by owner)
exports.deletePitch = async (req, res) => {
  const pitchId = req.params.id;
  const userId = req.user.id;

  try {
    // First check if the pitch exists and belongs to the user
    const [pitch] = await db.query('SELECT * FROM pitches WHERE id = ? AND user_id = ?', [pitchId, userId]);
    
    if (pitch.length === 0) {
      return res.status(404).json({ message: 'Pitch not found or you do not have permission to delete it' });
    }

    // Delete the pitch
    await db.query('DELETE FROM pitches WHERE id = ?', [pitchId]);
    res.status(200).json({ message: 'Pitch deleted successfully' });
  } catch (error) {
    console.error('Error deleting pitch:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
