const express = require('express');
const passport = require('passport');



const google = passport.authenticate('google', { scope: ['profile'] });
/*
const googleCallback = passport.authenticate('google', { failureRedirect: '/' }, (req, res) => {
    // Aquí puedes agregar cualquier lógica adicional para redirigir al usuario después de que se haya autenticado con éxito
    res.redirect('/dashboard');
  })*/

  const googleCallback = passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect: '/dashboard'
  })

module.exports = {
    google,
    googleCallback
  };