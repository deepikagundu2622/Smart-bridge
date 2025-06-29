const express = require('express');
const router = express.Router();
const { getAllUsers, updateApproval } = require('../controllers/userController');

router.get('/', getAllUsers);
router.patch('/:id/approval', updateApproval);

module.exports = router;
