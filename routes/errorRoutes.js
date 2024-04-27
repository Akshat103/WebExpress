// routes/errorRoutes.js

const express = require('express');
const router = express.Router();

const errorController = require('../controllers/errorController');

// Define routes
router.get('/error', errorController.index);

module.exports = router;
