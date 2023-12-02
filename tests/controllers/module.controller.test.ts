import request from 'supertest';
import express from 'express';
import {
  addTraineesModuleController,
  createModuleController,
} from '../../src/controllers/module.controller';
import {
  createModuleRepository,
  addTraineesModuleRepository,
  findModuleByIdRepository
} from '../../src/repositories/module.repository';

const app = express();
app.use(express.json());
app.post('/', createModuleController);
app.put('/:id', addTraineesModuleController);

jest.mock('../../src/repositories/module.repository', () => ({
  createModuleRepository: jest.fn(),
  addTraineesModuleRepository: jest.fn(),
  findModuleByIdRepository: jest.fn()
}));

describe('createModuleController', () => {
  const trainees = {
    name: 'Juan',
    lastName: 'Mamani',
    email: 'juan.mamani@example.com',
    grade: 90,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with status 201 and return created module', async () => {
    const mockCreatedModule = {
      name: 'Test Module',
      description: 'Testing module',
      trainerId: 1,
      startDate: String(new Date()),
      endDate: String(new Date()),
      schedule: '10:30 - 12:00',
    };

    (createModuleRepository as jest.Mock).mockResolvedValueOnce(
      mockCreatedModule,
    );

    const response = await request(app).post('/').send();

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCreatedModule);
  });

  it('should respond with status 500 and error message on repository error', async () => {
    const mockError = new Error('Repository error');
    (createModuleRepository as jest.Mock).mockRejectedValueOnce(mockError);

    const response = await request(app).post('/').send();

    expect(response.status).toBe(500);
  });

  it('should respond with status 202 and return updated module', async () => {
    const mockUpdatedModule = {
      name: 'Test Module',
      description: 'Testing module',
      trainerId: 1,
      trainees: [trainees],
      startDate: String(new Date()),
      endDate: String(new Date()),
      schedule: '10:30 - 12:00',
    };

    (addTraineesModuleRepository as jest.Mock).mockResolvedValueOnce(
      mockUpdatedModule,
    );
    (findModuleByIdRepository as jest.Mock).mockResolvedValueOnce(
      mockUpdatedModule,
    );

    const response = await request(app).put('/1').send([trainees]);

    expect(response.status).toBe(202);
    expect(response.body).toEqual(mockUpdatedModule);
  });

  it('should respond with status 500 and error message on updated repository error', async () => {
    const mockError = new Error('Repository error');
    (addTraineesModuleRepository as jest.Mock).mockRejectedValueOnce(mockError);
    (findModuleByIdRepository as jest.Mock).mockRejectedValueOnce(mockError);

    const response = await request(app).put('/2').send([trainees]);

    expect(response.status).toBe(500);
  });
});
