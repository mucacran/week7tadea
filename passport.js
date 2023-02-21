const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/User')

const dotenv = require('dotenv')
dotenv.config()

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://week7tarea.onrender.com/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => done(err, user))
  // })
  /***************/
  // passport.deserializeUser((id, done) => {
  //   User.findById(mongoose.Types.ObjectId(id), (err, user) => done(err, user))
  // })
  passport.deserializeUser((id, done) => {
    console.log("deserializeUser id:",id);
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return done(new Error('Invalid user ID'));
    }
    User.findById(mongoose.Types.ObjectId(id), (err, user) => {
      done(err, user);
    });
  });
  
  
}