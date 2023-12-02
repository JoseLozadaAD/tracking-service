import { Router } from 'express';
import {
  addTraineesModuleController,
  createModuleController,
  addFeedbackToTraineeController,
  setGradeToTraineeController
} from '../controllers/module.controller';
import { validateFeedbackData, validateModuleData, validateTraineeData } from '../middlewares/validateData';

const router = Router();

router.post('/', validateModuleData, createModuleController);
router.put('/:id', validateTraineeData, addTraineesModuleController);

router.put('/:moduleId/trainees/:traineeId/grades', setGradeToTraineeController);
router.put('/:moduleId/trainees/:traineeId/feedbacks', validateFeedbackData, addFeedbackToTraineeController);

export default router;