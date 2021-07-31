import { config } from 'dotenv';

if (config().error) {
  throw new Error('.env file not found');
}

export const environment = {
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  DB_USERNAME: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  DB_HOST: process.env.HOST,
  AMQP_SERVER: process.env.AMQP_SERVER,
  QUEUE: process.env.QUEUE,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PWD: process.env.MAIL_PWD,
  JWT_SECRET: process.env.JWT_SECRET,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
};
