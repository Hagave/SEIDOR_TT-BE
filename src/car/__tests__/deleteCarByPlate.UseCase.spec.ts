import { NotFoundException } from '@nestjs/common';
import { CarEntity } from '../domain/entities/car.entity';
import { randomUUID } from 'crypto';
import { CarRepository } from '../domain/repositories/car.repository';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';
import { DeleteCarByIdUseCase } from '../application/useCases/deleteCarByPlate.UseCase';
import { mockCarRepository } from '../__moks__/car.dto.mock';

describe('DeleteCarByIdUseCase', () => {
  let useCase: DeleteCarByIdUseCase;
  let carRepository: jest.Mocked<CarRepository>;
  let findCarByIdUseCase: jest.Mocked<FindCarByIdUseCase>;

  const plate = 'ABC123';

  beforeEach(() => {
    carRepository = mockCarRepository();

    findCarByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindCarByIdUseCase>;

    useCase = new DeleteCarByIdUseCase(carRepository, findCarByIdUseCase);

    jest.clearAllMocks();
  });

  it('should delete the car if it exists', async () => {
    const existingCar = new CarEntity(
      randomUUID(),
      plate,
      'black',
      'Honda',
      false,
    );

    findCarByIdUseCase.execute.mockResolvedValue(existingCar);
    carRepository.deleteCarByPlate.mockResolvedValue(undefined);

    await useCase.execute(plate);
  });

  it('should throw NotFoundException if car does not exist', async () => {
    findCarByIdUseCase.execute.mockResolvedValue(null);

    await expect(useCase.execute(plate)).rejects.toThrow(NotFoundException);
  });
});
