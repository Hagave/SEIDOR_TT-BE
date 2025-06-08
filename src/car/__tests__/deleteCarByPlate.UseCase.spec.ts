import { NotFoundException } from '@nestjs/common';
import { CarRepository } from '../domain/repositories/car.repository';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';
import { DeleteCarByIdUseCase } from '../application/useCases/deleteCarByPlate.UseCase';
import { existingCar, mockCarRepository } from '../__moks__/car.mock';

describe('DeleteCarByIdUseCase', () => {
  let useCase: DeleteCarByIdUseCase;
  let carRepository: jest.Mocked<CarRepository>;
  let findCarByIdUseCase: jest.Mocked<FindCarByIdUseCase>;

  beforeEach(() => {
    carRepository = mockCarRepository();

    findCarByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindCarByIdUseCase>;

    useCase = new DeleteCarByIdUseCase(carRepository, findCarByIdUseCase);

    jest.clearAllMocks();
  });

  it('should delete the car if it exists', async () => {
    findCarByIdUseCase.execute.mockResolvedValue(existingCar);
    carRepository.deleteCarByPlate.mockResolvedValue(undefined);

    await useCase.execute(existingCar.getPlate());
  });

  it('should throw NotFoundException if car does not exist', async () => {
    findCarByIdUseCase.execute.mockResolvedValue(null);
    const plate = 'ABC123';
    await expect(useCase.execute(plate)).rejects.toThrow(NotFoundException);
  });
});
