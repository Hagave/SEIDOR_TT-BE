import { DriverRepository } from '../domain/repositories/driver.repository';
import { DriverEntity } from '../domain/entities/driver.entity';
import { fakeDriver, mockDriverRepository } from '../__moks__/driver.moks';
import { FilteredDriversUseCase } from '../applications/useCases/filteredDrivers.useCase';
import { randomUUID } from 'node:crypto';

describe('FilteredDriversUseCase', () => {
  let useCase: FilteredDriversUseCase;
  let driverRepo: jest.Mocked<DriverRepository>;

  beforeEach(() => {
    driverRepo = mockDriverRepository();
    useCase = new FilteredDriversUseCase(driverRepo);
    jest.clearAllMocks();
  });

  it('should create a new driver', async () => {
    const driver: DriverEntity[] = [
      new DriverEntity(randomUUID(), 'Jhon', false),
      new DriverEntity(randomUUID(), 'Chris', false),
    ];

    driverRepo.filteredDriversByName.mockResolvedValue(driver);

    const result = await useCase.execute(fakeDriver);

    const spy = jest.spyOn(driverRepo, 'filteredDriversByName');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(fakeDriver.name);

    expect(result).toEqual(driver);
  });
});
