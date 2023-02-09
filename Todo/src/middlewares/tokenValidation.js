const HTTPError = require('../errors/HTTPError');
const axios = require('axios');
const Joi = require('joi');
const tokenSchema = Joi.object({
  token: Joi.string().required(),
});
const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { error } = tokenSchema.validate();
    if (error) throw new HTTPError(400, error.details[0].message);
    const verifyToken = await axios.post(
      'http://localhost:3001/token/validate',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(verifyToken);
    if (verifyToken) next();
    else {
      throw new HTTPError(401, 'Unauthorized');
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.log('Catch of Todo Middleware');
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};
module.exports = { tokenValidation };
