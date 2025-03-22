const express = require('express');

const landingRouter = express.Router();

landingRouter.get('/', (req, res) => {
  res.sendFile('/index.html');
});

module.exports = landingRouter;
