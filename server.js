const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./src/db/connect');


//passport
const passport = require('passport')
//express-session
const session = require("express-session");
//const MongoStore = require('connect-mongo')(session)
//contraseñas
const dotenv = require('dotenv')
// Load config
dotenv.config()
// Passport config
require('./passport')(passport)

/*****
 * Comienzo de la conección con google
 */
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Aquí se realiza la lógica para guardar o recuperar el usuario en la base de datos
    return cb(null, profile);
  }
));
/* Fin de la coneccion con google */

const app = express();
const port = process.env.PORT || 8080;


/************************* */
// Middleware de sesiones
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
/*************************** */

/*En el archivo del profesor*/
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./src/routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
    console.log(`Running on port ${port}`);
  }
});
