FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD ["sh", "-c", "npx ts-node -r tsconfig-paths/register node_modules/knex/bin/cli.js --knexfile ./src/knexfile.ts migrate:latest && node dist/app.js"]
