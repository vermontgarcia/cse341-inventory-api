const express = require('express');
const { logGitHubUser, gitHubCallback } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.get('/github', logGitHubUser);

authRouter.get('/github/callback', gitHubCallback);

module.exports = authRouter;
