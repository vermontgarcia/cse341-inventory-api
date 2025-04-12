const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const session = require('express-session');

const {
  PORT,
  SECRET,
  GH_CLIENT_ID,
  GH_CLIENT_SECRET,
  GH_CALLBACK_URL,
} = require('./src/utils/const.env');
const mongodb = require('./src/database/connect');
const swaggerSpec = require('./src/docs/apiDoc');
const landingRouter = require('./src/routes/landingPage');
// const passport = require('./src/helpers/passportGitHub');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

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

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Add routes
// Landing Page
app.use(express.static('src/public'));
app.get('/', landingRouter);

// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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

app.get('/auth/github/login', passport.authenticate('github'), (req, res) => {
  console.log('here');
});

app.use('/auth/github/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/auth/github/logout');

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
