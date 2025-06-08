import { UpdateCarByIdUseCase } from '../application/useCases/updateCarById.useCase';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';
import { mockCarRepository } from '../__moks__/car.dto.mock';
import { CarEntity } from '../domain/entities/car.entity';
import { randomUUID } from 'crypto';
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
    const existingCar = new CarEntity(
      randomUUID(),
      'OLD123',
      'black',
      'Ford',
      false,
    );

    carRepositoryMock.findCarById.mockResolvedValue(existingCar);

    const updateDto: UpdateCarDto = {
      plate: 'NEW456',
      brand: 'Tesla',
      color: 'white',
      isReserved: true,
    };

    const result = await useCase.execute(existingCar.getId(), updateDto);
    const spy = jest.spyOn(carRepositoryMock, 'updateCar');

    // ✅ Correto: usa os getters para validar o novo estado
    expect(result.getPlate()).toBe(updateDto.plate);
    expect(result.getBrand()).toBe(updateDto.brand);
    expect(result.getColor()).toBe(updateDto.color);
    expect(result.getIsReserved()).toBe(updateDto.isReserved);
    expect(spy).toHaveBeenCalledWith(result);
  });

  it('should update only the isReserved', async () => {
    const car = new CarEntity(randomUUID(), 'AAA111', 'gray', 'Fiat', false);
    carRepositoryMock.findCarById.mockResolvedValue(car);

    const dto: UpdateCarDto = { isReserved: true };
    const result = await useCase.execute(car.getId(), dto);
    const spy = jest.spyOn(carRepositoryMock, 'updateCar');

    // ✅ Verifica que apenas isReserved foi atualizado
    expect(result.getBrand()).toBe('Fiat');
    expect(result.getColor()).toBe('gray');
    expect(result.getPlate()).toBe('AAA111');
    expect(result.getIsReserved()).toBe(true);
    expect(spy).toHaveBeenCalledWith(result);
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

    const updateDto: UpdateCarDto = {
      plate: 'ABC123',
      color: 'blue',
      brand: 'Toyota',
      isReserved: false,
    };

    const result = await useCase.execute(mockCar.getId(), updateDto);
    const spy = jest.spyOn(carRepositoryMock, 'findCarById');

    expect(spy).toHaveBeenCalledWith(mockCar.getId());
    expect(result).toEqual(mockCar);
    expect(result).toBeInstanceOf(CarEntity);
  });
});
