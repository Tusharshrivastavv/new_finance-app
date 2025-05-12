const express = require('express');
const router = express.Router();
const emiController = require('../controllers/emiController');
const { authenticate } = require('../utils/authMiddleware');

router.post('/', authenticate, emiController.addEmi);
router.get('/', authenticate, emiController.getEmis);
router.delete('/:id', authenticate, emiController.deleteEmi);

module.exports = router;
