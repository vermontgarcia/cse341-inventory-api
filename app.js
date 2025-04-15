const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const session = require('express-session');
const path = require('path');

const {
  PORT,
  SECRET,
  GH_CLIENT_ID,
  GH_CLIENT_SECRET,
  GH_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = require('./src/utils/const.env');
const mongodb = require('./src/database/connect');
const { swaggerSpec, swaggerUiOptions } = require('./src/docs/apiDoc');
const landingRouter = require('./src/routes/landingPage');
// const passport = require('./src/helpers/passportGitHub');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userRouter = require('./src/routes/userRoutes');
const brandRouter = require('./src/routes/brandRoutes');
const authRouter = require('./src/routes/auth');

const port = PORT || 8080;

const app = express();
app.use(session({ secret: SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

passport.use(
  new GitHubStrategy(
    {
      clientID: GH_CLIENT_ID,
      clientSecret: GH_CLIENT_SECRET,
      callbackURL: GH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // TODO: Add a user to the database
      // User.create(profile);
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // Allow access to req object in callback
    },
    (req, accessToken, refreshToken, profile, done) => {
      // This is where you would typically authenticate the user (e.g., check if they exist in your database)
      // For simplicity, we'll just return the profile here
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

// Add routes
// Landing Page
// app.use(express.static('src/public'));
app.use(express.static(path.join(__dirname, 'src/public')));
app.get('/', landingRouter);

// Swagger Documentation
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

// API Routes
// app.use('/auth', authRouter);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    // Successful authentication, redirect to a protected page or homepage
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

app.get('/auth/github/login', passport.authenticate('github'), (req, res) => {
  console.log('GitHub Login');
});

app.get(
  '/auth/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    console.log('Google Login');
  }
); // Redirect to Google for authentication

app.use('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.use('/v1/users', userRouter);
app.use('/v1/brands', brandRouter);

// Initialize DB and Start Server
mongodb.initDB((error) => {
  if (error) {
    console.error(error);
  } else {
    app.listen(port, () => {
      console.log(`App is listening running on port ${port}`);
    });
  }
});
