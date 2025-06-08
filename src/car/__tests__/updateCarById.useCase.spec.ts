import { UpdateCarByIdUseCase } from '../application/useCases/updateCarById.useCase';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';
import {
  existingCar,
  mockCarRepository,
  updateFakeCarDto,
} from '../__moks__/car.mock';
import { CarEntity } from '../domain/entities/car.entity';
import { UpdateCarDto } from '../interfaces/dto/update-car.dto';

describe('UpdateCarByIdUseCase', () => {
  let useCase: UpdateCarByIdUseCase;
  let carRepositoryMock: ReturnType<typeof mockCarRepository>;
  let findCarByIdUseCase: FindCarByIdUseCase;

  beforeEach(() => {
    carRepositoryMock = mockCarRepository();
    findCarByIdUseCase = new FindCarByIdUseCase(carRepositoryMock);
    useCase = new UpdateCarByIdUseCase(carRepositoryMock, findCarByIdUseCase);
    jest.clearAllMocks();
  });

  it('should return null if no car is found', async () => {
    carRepositoryMock.findCarById.mockResolvedValue(null);

    const result = await findCarByIdUseCase.execute('NOT_FOUND');

    const spy = jest.spyOn(carRepositoryMock, 'findCarById');

    expect(spy).toHaveBeenCalledWith('NOT_FOUND');
    expect(result).toBeNull();
  });

  it('should update all fields of the car', async () => {
    carRepositoryMock.findCarById.mockResolvedValue(existingCar);

    const result = await useCase.execute(existingCar.getId(), updateFakeCarDto);
    const spy = jest.spyOn(carRepositoryMock, 'updateCar');

    expect(result.getPlate()).toBe(updateFakeCarDto.plate);
    expect(result.getBrand()).toBe(updateFakeCarDto.brand);
    expect(result.getColor()).toBe(updateFakeCarDto.color);
    expect(result.getIsReserved()).toBe(updateFakeCarDto.isReserved);
    expect(spy).toHaveBeenCalledWith(result);
  });

  it('should update only the isReserved', async () => {
    carRepositoryMock.findCarById.mockResolvedValue(existingCar);

    const dto: UpdateCarDto = { isReserved: false };
    const result = await useCase.execute(existingCar.getId(), dto);
    const spy = jest.spyOn(carRepositoryMock, 'updateCar');

    expect(result.getBrand()).toBe('Tesla');
    expect(result.getColor()).toBe('white');
    expect(result.getPlate()).toBe('NEW456');
    expect(result.getIsReserved()).toBe(false);
    expect(spy).toHaveBeenCalledWith(result);
  });

  it('should return a car when a matching ID or plate is found', async () => {
    carRepositoryMock.findCarById.mockResolvedValue(existingCar);

    const updateDto: UpdateCarDto = {
      plate: 'ABC123',
      color: 'blue',
      brand: 'Toyota',
      isReserved: false,
    };

    const result = await useCase.execute(existingCar.getId(), updateDto);
    const spy = jest.spyOn(carRepositoryMock, 'findCarById');

    expect(spy).toHaveBeenCalledWith(existingCar.getId());
    expect(result).toEqual(existingCar);
    expect(result).toBeInstanceOf(CarEntity);
  });
});
