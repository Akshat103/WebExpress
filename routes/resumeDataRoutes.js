const express = require('express');
const router = express.Router();
const {formController} = require('../controllers/resumeDataController');
const authenticateToken = require('../middleware/authMiddleware');
const {upload} = require('../utils/utils')
// Routes
router.get('/get-started', authenticateToken, formController.index);
router.get('/update-details', authenticateToken, formController.updatePage);
router.post('/api/update-details', authenticateToken, upload.any(), formController.updateResume);
router.post('/api/add-resume', authenticateToken, upload.any(), formController.createResume);

module.exports = router;
