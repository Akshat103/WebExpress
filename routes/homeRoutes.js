// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define routes
router.get('/', homeController.index);

module.exports = router;
