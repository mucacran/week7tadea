const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
router.use('/swagger', require('./swagger'));
router.use('/curriculum', require('./curriculum'));

module.exports = router;