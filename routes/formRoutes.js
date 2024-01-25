// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Define routes
router.get('/', formController.index);

module.exports = router;
