const { body, validationResult } = require('express-validator');

const registerUserRulesInterceptor = () => [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateUserRulesInterceptor = () => [
  body('email').isEmail().withMessage('Must be a valid email'),
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
