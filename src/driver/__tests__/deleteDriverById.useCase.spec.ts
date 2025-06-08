import { DriverRepository } from '../domain/repositories/driver.repository';
import { mockDriverRepository, newFakeDriver } from '../__moks__/driver.moks';
import { FindDriverByIdUseCase } from '../applications/useCases/findDriverById.useCase';
import { NotFoundException } from '@nestjs/common';
import { DeleteDriverByIdUseCase } from '../applications/useCases/deleteDriverById.useCase';

describe('DeleteDriverByIdUseCase', () => {
  let useCase: DeleteDriverByIdUseCase;
  let driverRepo: jest.Mocked<DriverRepository>;
  let findDriver: jest.Mocked<FindDriverByIdUseCase>;

  beforeEach(() => {
    driverRepo = mockDriverRepository();

    findDriver = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindDriverByIdUseCase>;

    useCase = new DeleteDriverByIdUseCase(driverRepo, findDriver);
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if driver does not exist', async () => {
    findDriver.execute.mockResolvedValue(null);

    const fakeDriverId = 'fake-id';

    await expect(useCase.execute(fakeDriverId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete driver id it existis', async () => {
    findDriver.execute.mockResolvedValue(newFakeDriver);
    driverRepo.deleteDriverById.mockResolvedValue();

    await expect(
      useCase.execute(newFakeDriver.getId()),
    ).resolves.toBeUndefined();

    const syp = jest.spyOn(driverRepo, 'deleteDriverById');
    expect(syp).toHaveBeenLastCalledWith(newFakeDriver.getId());
  });
});
