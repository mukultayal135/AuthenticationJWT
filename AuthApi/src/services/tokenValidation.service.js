const HTTPError = require('../errors/HTTPError');
const jwtUtils = require('../utils/jwtUtils');
const { Users } = require('../../database/models');
const verifyToken = async (token) => {
  const validatedToken = jwtUtils.verifyToken(token);
  // console.log('In Auth', validatedToken);
  if (!validatedToken) {
    console.log('Http');
    throw new HTTPError('Invalid token', 401);
  } else {
    const userExist = await Users.findOne({
      where: { username: validatedToken.username },
    });
    if (!userExist) throw new HTTPError('User not found', 401);
    else {
      return userExist;
    }
  }
};
module.exports = { verifyToken };
