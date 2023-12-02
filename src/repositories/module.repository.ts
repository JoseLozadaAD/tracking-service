import ModuleModel from '../models/module';
import { Module, Trainee, Feedback } from '../types/types';

export const createModuleRepository = async (module: Module): Promise<Module> => {
  return ModuleModel.create(module);
};

export const findModuleByIdRepository = async (id: string): Promise<Module|null> => {
  return ModuleModel.findById(id);
};

export const addTraineesModuleRepository = async (id: string, trainees: Module): Promise<Module|null> => {
  return ModuleModel.findByIdAndUpdate(id, trainees, { new: true });
};

export const addFeedbackToTraineeRepository = async (moduleId: string, traineeId: string, feedback: Feedback): Promise<Module|undefined> => {
  const module = await findModuleByIdRepository(moduleId);
  const trainee = module?.trainees?.find((trainee: Trainee) => trainee.id === traineeId);

  trainee?.feedback?.push(feedback);
  return module?.save();
};

export const findTraineeByIdRepository = async (moduleId: string, traineeId: string): Promise<Trainee|null> => {
  return ModuleModel.findById(moduleId, { trainees: { $elemMatch: { id: traineeId } } });
};

export const setGradeToTraineeRepository = async (moduleId: string, traineeId: string, grade: number): Promise<Module|undefined> => {
  const module = await findModuleByIdRepository(moduleId);
  const trainee = module?.trainees?.find((trainee: Trainee) => trainee.id === traineeId);

  trainee!.grade = grade;
  return module?.save();
};