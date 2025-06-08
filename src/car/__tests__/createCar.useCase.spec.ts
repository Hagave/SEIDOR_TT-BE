import { ConflictException } from '@nestjs/common';
import { CarEntity } from '../domain/entities/car.entity';
import { CreateCarUseCase } from '../application/useCases/createCar.useCase';
import {
  existingCar,
  fakeCarMockDto,
  mockCarRepository,
} from '../__moks__/car.mock';
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

    carRepo.createCar.mockResolvedValue(existingCar);

    const result = await useCase.execute(fakeCarMockDto);

    expect(result).toBeInstanceOf(CarEntity);
    expect(result.getPlate()).toEqual('OLD123');
  });

  it('should throw ConflictException if car plate already exists', async () => {
    findCarByIdUseCase.execute.mockResolvedValue(existingCar);

    await expect(useCase.execute(fakeCarMockDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
