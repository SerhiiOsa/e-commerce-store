import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import ENV_VARS from './config/envVars.js';
import router from './routes/index.js';
import connectMongoDB from './config/mongoDB.js';

const __dirname = path.resolve();

const app = new express();

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(router);

if (ENV_VARS.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(ENV_VARS.PORT, () => {
  console.log('Server started on http://localhost:' + ENV_VARS.PORT);
  connectMongoDB();
});
