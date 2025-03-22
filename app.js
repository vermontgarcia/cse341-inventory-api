const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const mongodb = require('./src/database/connect');
const swaggerSpec = require('./src/docs/apiDoc');
const { PORT } = require('./src/utils/const.env');

const port = PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Add routes

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
