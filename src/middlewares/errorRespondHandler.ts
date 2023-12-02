/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express';

const errorRespondHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next: NextFunction,
) => {
  response.header('Content-Type', 'application/json');
  const status = error.status || 400;

  response.status(status).send({
    status,
    title: error.name,
    error: error.errors || error.message
  });
};

export default errorRespondHandler;
