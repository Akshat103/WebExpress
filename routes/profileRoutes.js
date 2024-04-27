// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');

// Define routes
router.get('/profile', authenticateToken, profileController.index);

module.exports = router;
