const express = require('express');
const router = express.Router();
const membersController = require('../controllers/members');

router.get('/members', membersController.getMembers);

module.exports = router;