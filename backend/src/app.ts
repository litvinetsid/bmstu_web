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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
