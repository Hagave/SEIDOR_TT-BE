import { FilteredCarsByColorOrBrandUseCase } from '../application/useCases/filteredCarsByColorOrBrand.useCase';
import { CarRepository } from '../domain/repositories/car.repository';
import { CarEntity } from '../domain/entities/car.entity';
import { randomUUID } from 'crypto';
import { fakeCarMockDto, mockCarRepository } from '../__moks__/car.mock';

describe('FilteredCarsByColorOrBrandUseCase', () => {
  let useCase: FilteredCarsByColorOrBrandUseCase;
  let carRepository: jest.Mocked<CarRepository>;

  beforeEach(() => {
    carRepository = mockCarRepository();
    useCase = new FilteredCarsByColorOrBrandUseCase(carRepository);
    jest.clearAllMocks();
  });

  it('should return filtered cars by color and brand', async () => {
    const cars: CarEntity[] = [
      new CarEntity(randomUUID(), 'ABC123', 'blue', 'Toyota', false),
      new CarEntity(randomUUID(), 'XYZ789', 'blue', 'Toyota', false),
    ];

    carRepository.filteredCarsByColorOrBrand.mockResolvedValue(cars);

    const result = await useCase.execute(fakeCarMockDto);

    const spy = jest.spyOn(carRepository, 'filteredCarsByColorOrBrand');
    expect(spy).toHaveBeenCalledWith(
      fakeCarMockDto.color,
      fakeCarMockDto.brand,
    );

    expect(result).toEqual(cars);
  });
});
