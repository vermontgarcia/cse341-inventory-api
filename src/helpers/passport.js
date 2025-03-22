const passport = require('passport');
const User = require('../models/User');
const { Strategy } = require('passport-local');

passport.use(new Strategy({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
