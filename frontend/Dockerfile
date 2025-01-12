# Используем официальный образ Node.js для сборки
FROM node:18 AS build

# Установим рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Объявляем аргумент для передачи переменных окружения
ARG VITE_API_URL

# Устанавливаем переменную окружения для сборки
ENV VITE_API_URL=${VITE_API_URL}

# Копируем исходный код проекта
COPY . .

# Собираем Vue.js приложение, передавая переменную окружения
RUN npm run build

# Используем минимальный сервер для отдачи файлов
FROM nginx:stable

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный Nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Указываем команду для запуска NGINX
CMD ["nginx", "-g", "daemon off;"]
