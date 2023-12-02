import z, { object } from 'zod';

export const feedbackSchema = object({
  id: z.string().optional().nullable(),
  message: z.string().trim().min(1)
});

export const traineeSchema = z.array(
  z.object({
    id: z.number().int().positive().min(1),
    name: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().email().min(1),
    feedback: z.array(feedbackSchema).optional().nullable()
  })
);

export const moduleSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  trainerId: z.number().int().positive(),
  trainees: traineeSchema.optional().nullable(),
  startDate: z.coerce.date(),
  endDate:  z.coerce.date(),
  schedule: z.string().trim().min(1)
});

