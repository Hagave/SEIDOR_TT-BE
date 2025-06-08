import { ConflictException } from '@nestjs/common';
import { CarEntity } from '../domain/entities/car.entity';
import { randomUUID } from 'crypto';
import { CreateCarUseCase } from '../application/useCases/createCar.useCase';
import { mockCarRepository, mockDto } from '../__moks__/car.dto.mock';
import { CarRepository } from '../domain/repositories/car.repository';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';

describe('CreateCarUseCase', () => {
  let useCase: CreateCarUseCase;
  let carRepo: jest.Mocked<CarRepository>;
  let findCarByIdUseCase: jest.Mocked<FindCarByIdUseCase>;

  beforeEach(() => {
    carRepo = mockCarRepository();

    findCarByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindCarByIdUseCase>;

    useCase = new CreateCarUseCase(carRepo, findCarByIdUseCase);

    jest.clearAllMocks();
  });

  it('should create a new car if plate does not exist', async () => {
    findCarByIdUseCase.execute.mockResolvedValue(null);

    const fakeCar = new CarEntity(
      randomUUID(),
      mockDto.plate,
      mockDto.color,
      mockDto.brand,
      false,
    );

    carRepo.createCar.mockResolvedValue(fakeCar);

    const result = await useCase.execute(mockDto);

    expect(result).toBeInstanceOf(CarEntity);
    expect(result.getPlate()).toEqual('ABC123');
  });

  it('should throw ConflictException if car plate already exists', async () => {
    const existingCar = new CarEntity(
      randomUUID(),
      mockDto.plate,
      mockDto.color,
      mockDto.brand,
      false,
    );

    findCarByIdUseCase.execute.mockResolvedValue(existingCar);

    await expect(useCase.execute(mockDto)).rejects.toThrow(ConflictException);
  });
});
