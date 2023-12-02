import { ErrorResponse } from '../types/types';

export const simpleErrorHandler = (error: Error | unknown): ErrorResponse => {
  let message = 'Internal server error';
  let name = 'unknown error';
  let stack = undefined;
  let statusCode = 500;

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
    name = error.name;
    if (error.name === 'ValidationError') {
      statusCode = 400;
    }
  }

  if ( error instanceof TypeError ) {
    statusCode = 400;
  }


  return {
    name,
    statusCode,
    message,
    stack,
    json: {
      message: message,
      stack: stack,
      name: name
    }
  };
};