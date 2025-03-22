const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const session = require('express-session');

const { PORT, SECRET } = require('./src/utils/const.env');
const mongodb = require('./src/database/connect');
const swaggerSpec = require('./src/docs/apiDoc');
const landingRouter = require('./src/routes/landingPage');
const passport = require('./src/helpers/passport');
const userRouter = require('./src/routes/userRoutes');
const brandRouter = require('./src/routes/brandRoutes');

const port = PORT || 8080;

const app = express();
app.use(session({ secret: SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

// Add routes
// Landing Page
app.use(express.static('src/public'));
app.get('/', landingRouter);

// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// API Routes
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
