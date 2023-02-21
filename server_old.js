const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./src/db/connect');

//passport
const passport = require('passport')
//contraseñas
const dotenv = require('dotenv')
// Load config
dotenv.config({ path: '.env' })
// Passport config
require('./passport')(passport)

const app = express();
const port = process.env.PORT || 8080;

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
