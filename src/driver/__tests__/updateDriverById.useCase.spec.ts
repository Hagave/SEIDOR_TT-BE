import { UpdateDriverByIdUseCase } from '../applications/useCases/updateDriverById.useCase';
import {
  mockDriverRepository,
  newFakeDriver,
  updateFakeDriverDto,
} from '../__moks__/driver.moks';
import { FindDriverByIdUseCase } from '../applications/useCases/findDriverById.useCase';
import { UpdateDriverDto } from '../interfaces/dto/update-driver.dto';
import { NotFoundException } from '@nestjs/common';

describe('UpdateDriverByIdUseCase', () => {
  let useCase: UpdateDriverByIdUseCase;
  let driveRepo: ReturnType<typeof mockDriverRepository>;
  let findDriver: FindDriverByIdUseCase;

  beforeEach(() => {
    driveRepo = mockDriverRepository();
    findDriver = new FindDriverByIdUseCase(driveRepo);

    useCase = new UpdateDriverByIdUseCase(driveRepo, findDriver);
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if driver is not found', async () => {
    driveRepo.findDriverById.mockResolvedValue(null);

    await expect(
      useCase.execute('NOT_FOUND_ID', updateFakeDriverDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update all fields of the driver', async () => {
    driveRepo.findDriverById.mockResolvedValue(newFakeDriver);
    driveRepo.updateDriver.mockResolvedValue(newFakeDriver);

    const result = await useCase.execute(
      newFakeDriver.getId(),
      updateFakeDriverDto,
    );

    expect(result.getName()).toBe(updateFakeDriverDto.name);
    expect(result.getIsDriving()).toBe(updateFakeDriverDto.isDriving);

    const spy = jest.spyOn(driveRepo, 'updateDriver');
    expect(spy).toHaveBeenCalledWith(newFakeDriver.getId(), newFakeDriver);
  });

  it('should update only isDriving field', async () => {
    const partialDto: UpdateDriverDto = { isDriving: false };
    driveRepo.findDriverById.mockResolvedValue(newFakeDriver);
    driveRepo.updateDriver.mockResolvedValue(newFakeDriver);

    const result = await useCase.execute(newFakeDriver.getId(), partialDto);
    const spy = jest.spyOn(driveRepo, 'updateDriver');

    expect(result.getIsDriving()).toBe(false);
    expect(result.getName()).toBe(newFakeDriver.getName());

    expect(spy).toHaveBeenCalledWith(newFakeDriver.getId(), newFakeDriver);
  });
});
