import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import moduleRouter from './routes/module.route';
import errorRespondHandler from './middlewares/errorRespondHandler';
import errorLogger from './middlewares/errorLogger';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/modules', moduleRouter);
app.use(errorLogger);
app.use(errorRespondHandler);

export default app;
