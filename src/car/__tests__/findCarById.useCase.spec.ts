import { mockCarRepository } from '../__moks__/car.dto.mock';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';
import { CarEntity } from '../domain/entities/car.entity';
import { randomUUID } from 'crypto';

describe('FindCarByIdUseCase', () => {
  let useCase: FindCarByIdUseCase;
  let carRepositoryMock: ReturnType<typeof mockCarRepository>;

  beforeEach(() => {
    carRepositoryMock = mockCarRepository();
    useCase = new FindCarByIdUseCase(carRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return null if no car is found', async () => {
    carRepositoryMock.findCarById.mockResolvedValue(null);

    const result = await useCase.execute('NOT_FOUND');

    const spy = jest.spyOn(carRepositoryMock, 'findCarById');

    expect(spy).toHaveBeenCalledWith('NOT_FOUND');
    expect(result).toBeNull();
  });

  it('should return a car when a matching ID or plate is found', async () => {
    const mockCar = new CarEntity(
      randomUUID(),
      'ABC123',
      'blue',
      'Toyota',
      false,
    );

    carRepositoryMock.findCarById.mockResolvedValue(mockCar);

    const result = await useCase.execute('ABC123');

    const spy = jest.spyOn(carRepositoryMock, 'findCarById');

    expect(spy).toHaveBeenCalledWith('ABC123');
    expect(result).toEqual(mockCar);
    expect(result).toBeInstanceOf(CarEntity);
  });
});
