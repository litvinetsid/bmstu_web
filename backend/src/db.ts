import knex, { Knex } from 'knex';
import knexConfig from './knexfile';

const db: Knex = knex(knexConfig.development);

export default db;
