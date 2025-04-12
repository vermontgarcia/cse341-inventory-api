const passport = require('passport');

const logGitHubUser = (req, res, next) => {
  console.log('Here');
  passport.authenticate('github', (req, res) => {});
};

const gitHubCallback = (req, res) => {
  passport.authenticate(
    'github',
    { failureRedirect: '/api-docs', session: false },
    (params) => {
      console.log(params);
    }
  );
};

// const gitHubCallback = ()

module.exports = {
  logGitHubUser,
  gitHubCallback,
};
