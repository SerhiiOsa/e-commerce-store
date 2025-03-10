import dotenv from 'dotenv';
dotenv.config();

const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default ENV_VARS;
