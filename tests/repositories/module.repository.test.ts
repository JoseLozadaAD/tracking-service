import {
  createModuleRepository,
  addTraineesModuleRepository,
  findModuleByIdRepository
} from '../../src/repositories/module.repository';
import { Module } from '../../src/types/types';
import ModuleModel from '../../src/models/module';

jest.mock('../../src/models/module');

describe('createModuleRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not create a new module with incomplete data', async () => {
    const incompleteModuleData: Partial<Module> = {};
    const result = await createModuleRepository(incompleteModuleData as Module);

    expect(result).toBeUndefined();
  });

  it('should create a new module', async () => {
    const mockCreatedModule: Partial<Module> = {
      name: 'Test Module',
      description: 'Testing module',
      trainerId: 1,
      startDate: new Date(),
      endDate: new Date(),
      schedule: '10:30 - 12:00',
    };

    (ModuleModel.create as jest.Mock).mockResolvedValueOnce(mockCreatedModule);

    const createdModule = await createModuleRepository(mockCreatedModule as Module);

    expect(createdModule).toEqual(mockCreatedModule);
    expect(ModuleModel.create).toHaveBeenCalledWith(mockCreatedModule);
  });

  it('should handle create error', async () => {
    const mockModuleData = {};
    const mockError = new Error('Repository error');
    (ModuleModel.create as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(createModuleRepository(mockModuleData as Module)).rejects.toThrow(mockError);
    expect(ModuleModel.create).toHaveBeenCalledWith(mockModuleData);
  });

  it('should updated a module', async () => {
    const mockTrainees: Partial<Module> = {
      trainees: [{
        id: '1',
        name: 'Juan',
        lastName: 'Mamani',
        email: 'juan.mamani@example.com',
        grade: 90
      }]
    };

    const mockUpdatedModule: Partial<Module> = {
      name: 'Test Module',
      description: 'Testing module',
      trainerId: 1,
      trainees: [],
      startDate: new Date(),
      endDate: new Date(),
      schedule: '10:30 - 12:00',
    };

    (ModuleModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(mockUpdatedModule);

    await addTraineesModuleRepository('1', mockTrainees as Module);

    expect(ModuleModel.findByIdAndUpdate).toHaveBeenCalledWith('1', mockTrainees, { new: true });
  });

  it('should find a module', async () => {
    const mockModule: Partial<Module> = {
      name: 'Test Module',
      description: 'Testing module',
      trainerId: 1,
      trainees: [],
      startDate: new Date(),
      endDate: new Date(),
      schedule: '10:30 - 12:00',
    };

    (ModuleModel.findById as jest.Mock).mockResolvedValueOnce(mockModule);

    await findModuleByIdRepository('1');

    expect(ModuleModel.findById).toHaveBeenCalledWith('1');
  });
});