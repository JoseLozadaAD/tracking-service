import { Request, Response, NextFunction } from 'express';
import { object, string, number, date, ValidationError } from 'yup';

export const validateModuleData = async (req: Request, res: Response, next: NextFunction) => {
  const schema = object({
    id: number().optional().nullable(),
    name: string().required(),
    description: string().required(),
    trainerId: number().required().strict(),
    trainees: string().optional().nullable(),
    startDate: date().required(),
    endDate: date().required(),
    schedule: string().required()
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof ValidationError){
      return next(error);
    }

    if (error instanceof Error){
      return next(error);
    }

    return next({ status: 500, message: 'Server unknown issue' });
  }
};