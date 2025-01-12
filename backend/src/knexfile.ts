import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'example',
      database: process.env.POSTGRES_DB || 'restaurant_db',
    },
    migrations: {
      directory: './migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: process.env.KNEX_DEBUG === 'true',
  },
};

export default config;
