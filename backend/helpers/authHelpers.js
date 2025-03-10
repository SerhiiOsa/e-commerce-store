import jwt from 'jsonwebtoken';
import ENV_VARS from '../config/envVars.js';
import authConfig from '../config/auth.js';
import redisClient from '../config/redis.js';

export const generateTokens = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (userId, refreshToken) => {
  await redisClient.set(
    `refresh_token:${userId}`,
    refreshToken,
    'PX',
    authConfig.refreshTokenMaxAge
  );
};

export const getStoredToken = async (userId) => {
  return await redisClient.get(`refresh_token:${userId}`);
};

export const removeRefreshToken = async (userId) => {
  await redisClient.del(`refresh_token:${userId}`);
};

export const decodeAccessToken = (token) => {
  return jwt.verify(token, ENV_VARS.JWT_ACCESS_SECRET);
};

export const decodeRefreshToken = (token) => {
  return jwt.verify(token, ENV_VARS.JWT_REFRESH_SECRET);
};

function generateAccessToken(userId) {
  return jwt.sign({ userId }, ENV_VARS.JWT_ACCESS_SECRET, {
    expiresIn: authConfig.accessTokenExpIn,
  });
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, ENV_VARS.JWT_REFRESH_SECRET, {
    expiresIn: authConfig.refreshTokenExpIn,
  });
}
