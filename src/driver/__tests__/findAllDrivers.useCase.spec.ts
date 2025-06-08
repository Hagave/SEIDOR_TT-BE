import { randomUUID } from 'node:crypto';
import { mockDriverRepository } from '../__moks__/driver.moks';
import { FindAllDriversUseCase } from '../applications/useCases/findAllDrivers.useCase';
import { DriverEntity } from '../domain/entities/driver.entity';

describe('FindAllDriversUseCase', () => {
  let useCase: FindAllDriversUseCase;
  let driverRepo: ReturnType<typeof mockDriverRepository>;

  beforeEach(() => {
    driverRepo = mockDriverRepository();
    useCase = new FindAllDriversUseCase(driverRepo);

    jest.clearAllMocks();
  });
  it('should a list of drivers', async () => {
    const mockDrivers: DriverEntity[] = [
      new DriverEntity(randomUUID(), 'Jhon', false),
      new DriverEntity(randomUUID(), 'Chris', false),
    ];

    driverRepo.findAllDriver.mockResolvedValue(mockDrivers);

    const result = await useCase.execute();

    const spy = jest.spyOn(driverRepo, 'findAllDriver');

    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(mockDrivers);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(DriverEntity);
  });
});
