import dotenv from 'dotenv';

dotenv.config();

export default {
  client: 'pg', // or your database client of choice
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  migrations: {
    directory: './migrations', // path to your migration files
  },
  seeds: {
    directory: './seeds', // path to your seed files
  },
};