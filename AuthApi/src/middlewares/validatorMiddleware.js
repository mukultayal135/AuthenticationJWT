const schemas = require('../schemas/schemas');
const bodyValidator = (req, res, next) => {
  const { error } = schemas.userSchema.validate(req.body);

  if (error) res.status(400).json({ message: error.message });
  else {
    next();
  }
};
const authValidator = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    next();
  } else {
    res.status(401).json({ message: 'Token not found' });
  }
};
module.exports = { bodyValidator, authValidator };
