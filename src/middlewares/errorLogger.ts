import { ErrorRequestHandler } from 'express';

const errorLogger: ErrorRequestHandler = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.log({ error: error.message });
  next(error);
};

export default errorLogger;
