/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express';
import { IssueData } from 'zod';

const errorResponseHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next: NextFunction,
) => {
  response.header('Content-Type', 'application/json');
  const status = error.status || 400;

  const errorResponse = {
    status,
    title: error.name,
    error: error.message
  };

  const issuesData = error?.issues?.map((issue: IssueData) => {
    const { path: issueField, message } = issue;
    const field = issueField || [];
    const position = field[1] && field[0];
    return { field: field.at(-1), position,  message };
  });

  response.status(status).send({
    ...errorResponse,
    error: issuesData || errorResponse.error
  });
};

export default errorResponseHandler;
