const { createClient } = require('redis');

const redisClient = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_SECRET,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Error connecting:', error.message);
        process.exit(1);
    }
}

// Listen for the 'error' event
redisClient.on('error', err => {
    console.error('Redis Client Error', err);
});

// Listen for the 'connect' event
redisClient.on('connect', () => {
    console.log('Redis connected');
});

module.exports = {redisClient, connectRedis};
