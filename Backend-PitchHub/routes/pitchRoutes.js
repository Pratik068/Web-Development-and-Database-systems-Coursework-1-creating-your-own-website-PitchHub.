// routes/pitchRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  submitPitch,
  createPitch,
  getAllPitches,
  getPitchById,
  getUserPitches,
  deletePitch
} = require('../controllers/pitchController');

const { verifyToken } = require('../middleware/authMiddleware');

// Configure multer for pitch deck uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

/** 
 * Routes
 */

// Submit pitch with file (Authenticated entrepreneurs)
router.post('/submit', verifyToken, upload.single('pitch_deck'), submitPitch);

// Basic pitch creation without file (Authenticated users)
router.post('/create', verifyToken, createPitch);

// Get all pitches (with filters)
router.get('/', getAllPitches);

// Get user's pitches (Authenticated)
router.get('/user', verifyToken, getUserPitches);

// Get single pitch by ID
router.get('/:id', getPitchById);

// Delete pitch (Authenticated - only owner)
router.delete('/:id', verifyToken, deletePitch);

module.exports = router;
