// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Define routes
router.get('/', profileController.index);

module.exports = router;
