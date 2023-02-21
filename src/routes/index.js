const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
router.get('/dashboard', async (req, res) => {
  try {
    res.send("Bienvenido");
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})



router.use('/swagger', require('./swagger'));
router.use('/curriculum', require('./curriculum'));
//log con google
router.use('/auth', require('./auth'));



module.exports = router;