const express = require('express');
const router = express.Router();
const membersRouter = require('./members');
const artsRouter = require('./arts');


router.use('/members', membersRouter);
router.use('/arts', artsRouter);


module.exports = router;