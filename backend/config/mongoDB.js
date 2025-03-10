import mongoose from 'mongoose';
import ENV_VARS from './envVars.js';

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_DB_URI);
    console.log('MongoDB connected: ' + conn.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectMongoDB;
