// routes/siteRoutes.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

// Define routes for rendering themes
router.get('/:username', siteController.renderTheme);

module.exports = router;
