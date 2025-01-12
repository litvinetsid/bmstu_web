import https from 'https';
import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = Number(process.env.NODE_PORT) || 8080;

app.use(express.json());
app.use(cors({
  origin: `${process.env.CORS_ORIGIN}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/v1', routes);
app.use(errorMiddleware);

const SSL_KEY = process.env.SSL_KEY_PATH;
const SSL_CERT = process.env.SSL_CERT_PATH;

if (SSL_KEY && SSL_CERT && fs.existsSync(SSL_KEY) && fs.existsSync(SSL_CERT)) {
  const credentials = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
  };

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT} ${SSL_CERT} ${SSL_CERT && fs.existsSync(SSL_CERT)}`);
  });
}

export default app;
