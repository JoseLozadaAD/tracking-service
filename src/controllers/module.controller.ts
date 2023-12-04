import { NextFunction, Request, Response } from 'express';
import {
  createModuleRepository,
  addTraineesModuleRepository,
  addFeedbackToTraineeRepository,
  setGradeToTraineeRepository,
  findModuleByIdRepository
} from '../repositories/module.repository';
import { Module } from '../types/types';

export const createModuleController = async (req: Request, res: Response) => {
  const { body } = req;
  const newModule = await createModuleRepository(body as Module);

  return res.status(201).json(newModule);
};

export const addTraineesModuleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const id = req.params.id;

    const moduleFromDb = await findModuleByIdRepository(id);

    if (!moduleFromDb) {
      next({ status: 404, message: `Not found module with id '${id}'` });
    }

    const update: Partial<Module> = { trainees: [...moduleFromDb?.trainees || [], ...body] };
    const moduleUpdated = await addTraineesModuleRepository(id, update as Module);

    return res.status(202).json(moduleUpdated);
  } catch (error) {
    next(error);
  }
};

export const addFeedbackToTraineeController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { moduleId, traineeId } = req.params;

    const moduleUpdated = await addFeedbackToTraineeRepository(moduleId, traineeId, body);

    return res.status(201).json(moduleUpdated);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message, trace: error.stack });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const setGradeToTraineeController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { moduleId, traineeId } = req.params;

    const moduleUpdated = await setGradeToTraineeRepository(moduleId, traineeId, body.grade);

    return res.status(201).json(moduleUpdated);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message, trace: error.stack });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};