const { body, validationResult } = require('express-validator');

const registerUserRulesInterceptor = () => [
  body('email', 'Must be a valid email').isEmail().notEmpty(),
  body('name', 'Name is required').notEmpty(),
  body('password', 'Password is required').notEmpty(),
];

const updateUserRulesInterceptor = () => [
  body('email', 'Must be a valid email').isEmail(),
];

const validateRules = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors
    .array()
    .map((error) => ({ [error.path]: error.msg }));
  return res.status(422).json({ errors });
};

module.exports = {
  registerUserRulesInterceptor,
  updateUserRulesInterceptor,
  validateRules,
};
