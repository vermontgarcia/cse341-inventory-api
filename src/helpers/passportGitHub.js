const passport = require('passport');
const User = require('../models/User');
const { Strategy } = require('passport-github2');
const {
  GH_CLIENT_ID,
  GH_CLIENT_SECRET,
  GH_CALLBACK_URL,
} = require('../utils/const.env');

passport.use(
  new Strategy(
    {
      clientID: GH_CLIENT_ID,
      clientSecret: GH_CLIENT_SECRET,
      callbackURL: GH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // TODO: Add a user to the database
      User.create(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
