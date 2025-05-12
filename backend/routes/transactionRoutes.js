const express = require('express');
const transactionController = require('../controllers/transactionController');
const { authenticate } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/', authenticate, transactionController.addTransaction);
router.get('/', authenticate, transactionController.getTransactions);
router.delete('/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;