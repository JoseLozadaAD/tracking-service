import { Document } from 'mongoose';

export interface Trainee {
  id?: string
  name: string,
  lastName: string,
  email: string,
  grade?: number,
  feedback?: Feedback[]
}

export interface Feedback {
  id?: string,
  message: string
}

export interface Module extends Document {
  id? : number,
  name: string,
  description: string,
  trainerId: number,
  trainees?: Trainee[],
  startDate: Date,
  endDate: Date,
  schedule: string
}