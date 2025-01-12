import dotenv from 'dotenv';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';
import cors from 'cors';

// Инициализация переменных окружения
dotenv.config();

const app = express();
const PORT = Number(process.env.NODE_PORT) || 8080;

// Middleware для обработки JSON
app.use(express.json());

app.use(cors({
    origin: `http://localhost:${process.env.VUE_PORT}`, // Разрешенный источник (фронтенд)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  }));

// Подключение маршрутов
app.use('/api/v1', routes);

// Обработка ошибок через middleware
app.use(errorMiddleware);


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
