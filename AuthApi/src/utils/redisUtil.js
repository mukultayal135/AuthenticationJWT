const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});

redisClient.on('error', (err) => {
  console.log('Redis Connection error: ', err.message);
});
const storeToken = async (token, username) => {
  redisClient.connect();
  await redisClient.set(username, token, 'EX', 3600);
  redisClient.disconnect();
};
const getToken = async (username) => {
  redisClient.connect();
  const token = await redisClient.get(username);
  redisClient.disconnect();
  return token;
};

module.exports = { storeToken, getToken };
