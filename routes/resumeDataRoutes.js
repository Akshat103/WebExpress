const express = require('express');
const router = express.Router();
const {formController, createResume, getResumeByUserId} = require('../controllers/resumeDataController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes
router.get('/get-started', authenticateToken, formController.index);
router.post('/resume', authenticateToken, createResume);
router.get('/resume/:userId', getResumeByUserId);

module.exports = router;
