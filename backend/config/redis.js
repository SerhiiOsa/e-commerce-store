import Redis from 'ioredis';
import ENV_VARS from './envVars.js';

const redisClient = new Redis(ENV_VARS.UPSTASH_REDIS_URL);

export default redisClient;
