const mongoose = require('mongoose');
const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', err => console.log('Redis Client Error', err));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
    await redisClient.connect();
    console.log('Redis Connected');
  } catch (error) {
    console.error('Error connecting:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, redisClient };