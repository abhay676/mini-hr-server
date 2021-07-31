import express from 'express';
import cors from 'cors';
import db from './api/db/database.js';
import router from './api/routes/index.js';
export const app = express();

async function initApp() {
  app.use(express.json());
  app.use(cors());

  app.use(router);

  app.all('*', (req, res, next) => {
    const origin = req.originalUrl;
    const err = new Error(`Can't find ${req.originalUrl}`);
    err.status = false;
    err.statusCode = 404;
    err.origin = origin;
    next(err);
  });
  // global error handler
  app.use((err, req, res, next) => {
    let errors = [],
      errObj = {};
    err.statusCode = err.statusCode || 500;
    const origin = req.originalUrl;
    errObj.message = err.message;
    errObj.value = err.value;
    errObj.location = err.location || 'APP_INTERNAL';
    errObj.origin = origin;
    errors.push(errObj);
    res.status(err.statusCode).json({
      status: false,
      errors,
    });
  });
  await db.sequelize.sync({ logging: false });
}

initApp();
