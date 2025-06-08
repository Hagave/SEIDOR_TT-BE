import { CreateDriverUseCase } from '../applications/useCases/createDriver.useCase';
import { DriverRepository } from '../domain/repositories/driver.repository';
import { DriverEntity } from '../domain/entities/driver.entity';
import {
  fakeDriver,
  mockDriverRepository,
  newFakeDriver,
} from '../__moks__/driver.moks';

describe('CreateDriverUseCase', () => {
  let useCase: CreateDriverUseCase;
  let driverRepo: jest.Mocked<DriverRepository>;

  beforeEach(() => {
    driverRepo = mockDriverRepository();
    useCase = new CreateDriverUseCase(driverRepo);
    jest.clearAllMocks();
  });

  it('should create a new driver', async () => {
    driverRepo.createDriver.mockResolvedValueOnce(newFakeDriver);

    const result = await useCase.execute(fakeDriver);

    const spy = jest.spyOn(driverRepo, 'createDriver');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.any(DriverEntity));
    expect(result).toBeInstanceOf(DriverEntity);
    expect(result.getName()).toBe(fakeDriver.name);
    expect(result.getIsDriving()).toBe(false);
  });
});
