import { mockCarRepository } from '../__moks__/car.mock';
import { FindAllCarsUseCase } from '../application/useCases/findAllCars.UseCase';
import { CarEntity } from '../domain/entities/car.entity';
import { randomUUID } from 'crypto';

describe('FindAllCarsUseCase', () => {
  let useCase: FindAllCarsUseCase;
  let carRepository: ReturnType<typeof mockCarRepository>;

  beforeEach(() => {
    carRepository = mockCarRepository();
    useCase = new FindAllCarsUseCase(carRepository);
    jest.clearAllMocks();
  });

  it('should return a list of cars', async () => {
    const mockCars: CarEntity[] = [
      new CarEntity(randomUUID(), 'ABC123', 'blue', 'Toyota', false),
      new CarEntity(randomUUID(), 'DEF456', 'red', 'Honda', true),
    ];

    carRepository.findAllCars.mockResolvedValue(mockCars);

    const result = await useCase.execute();

    const spy = jest.spyOn(carRepository, 'findAllCars');

    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(mockCars);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(CarEntity);
  });
});
