import { Request, Response, NextFunction } from 'express';
import { moduleSchema, traineeSchema, feedbackSchema } from '../types/schemas';
import z from 'zod';

export const validateData = async<T> (schema: z.ZodSchema<T>, req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await schema.parseAsync(req.body);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError){
      return next(error);
    }
    if (error instanceof Error) {
      return next(error);
    }

    return next({ status: 500, message: 'Server unknown issue' });
  }
};

export const validateModuleData = async (req: Request, res: Response, next: NextFunction) => {
  await validateData(moduleSchema, req, res, next);
  if (!res.writableEnded) {
    next();
  }
};

export const validateTraineeData = async (req: Request, res: Response, next: NextFunction) => {
  await validateData(traineeSchema, req, res, next);
  if (!res.writableEnded) {
    next();
  }
};

export const validateFeedbackData = async (req: Request, res: Response, next: NextFunction) => {
  await validateData(feedbackSchema, req, res, next);
  if (!res.writableEnded) {
    next();
  }
};