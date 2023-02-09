const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = {
    username: user.username,
  };
  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: '1h',
  });

  return token;
};
const verifyToken = (token) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const isTokenCorrect = jwt.verify(token, jwtSecretKey, (err, decoded) => {
    return err ? false : decoded;
  });

  return isTokenCorrect;
};
module.exports = { generateToken, verifyToken };
