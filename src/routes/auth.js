const authController = require('../controllers/authController.js');


const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
//router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
router.get('/', authController.google);
router.get('/google/callback',authController.googleCallback);


module.exports = router