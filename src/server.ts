import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './logs/logger';

import moduleRouter from './routes/module.route';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

app.use('/modules', moduleRouter);

export default app;
