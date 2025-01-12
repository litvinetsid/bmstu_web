# Использовать официальный образ Node.js
FROM node:18

# Установить рабочую директорию
WORKDIR /usr/src/app

# Копировать package.json и package-lock.json
COPY package*.json ./

# Установить зависимости (включая TypeScript и Knex)
RUN npm install

# Копировать исходный код
COPY . .

# Скомпилировать TypeScript (опционально, если хотите запускать скомпилированный код)
RUN npx tsc

# Открыть порт
EXPOSE 3000

# Указать команду запуска (используем ts-node для работы с knexfile.ts)
CMD ["sh", "-c", "npx ts-node -r tsconfig-paths/register node_modules/knex/bin/cli.js --knexfile ./src/knexfile.ts migrate:latest && node dist/app.js"]

# CMD ["tail", "-f", "/dev/null"]
