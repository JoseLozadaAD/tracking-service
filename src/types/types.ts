import { Document } from 'mongoose';

export interface Module extends Document {
  name: string,
  description: string,
  trainerId: number,
  trainees?: Array<string>,
  startDate: Date,
  endDate: Date,
  schedule: string
}