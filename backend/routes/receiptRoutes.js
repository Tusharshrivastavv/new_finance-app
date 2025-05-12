const express = require('express');
const receiptController = require('../controllers/receiptController');
const { authenticate } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/upload', authenticate, receiptController.uploadReceipt);

module.exports = router;