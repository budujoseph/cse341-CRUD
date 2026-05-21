const express = require('express');
const router = express.Router();
const membersRouter = require('./members');

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.use('/', membersRouter);

module.exports = router;