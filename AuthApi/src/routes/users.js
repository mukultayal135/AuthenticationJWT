const userController = require('../controllers/users.controller');
const express = require('express');
const tokenValidateController = require('../controllers/tokenValidation.controller');
const router = express.Router();
const validator = require('../middlewares/validatorMiddleware');
router
  .post('/users', validator.bodyValidator, userController.createUser)
  .post('/login', userController.loginUser)
  .post('/token/validate', tokenValidateController.verifyToken);
module.exports = router;
