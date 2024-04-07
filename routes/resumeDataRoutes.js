const express = require('express');
const router = express.Router();
const {formController, createResume} = require('../controllers/resumeDataController');
const authenticateToken = require('../middleware/authMiddleware');
const {upload} = require('../utils/utils')
// Routes
router.get('/get-started', authenticateToken, formController.index);
router.post('/resume', authenticateToken, upload.any(), createResume);

module.exports = router;
