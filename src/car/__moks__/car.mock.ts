import { randomUUID } from 'node:crypto';
import { CarEntity } from '../domain/entities/car.entity';
import { CarRepository } from '../domain/repositories/car.repository';
import { CreateCarDto } from '../interfaces/dto/create-car.dto';
import { UpdateCarDto } from '../interfaces/dto/update-car.dto';

export const fakeCarMockDto: CreateCarDto = {
  plate: 'ABC123',
  color: 'blue',
  brand: 'Toyota',
};

export const updateFakeCarDto: UpdateCarDto = {
  plate: 'NEW456',
  brand: 'Tesla',
  color: 'white',
  isReserved: true,
};

export const existingCar = new CarEntity(
  randomUUID(),
  'OLD123',
  'black',
  'Ford',
  false,
);

export const mockCarRepository = (): jest.Mocked<CarRepository> => ({
  createCar: jest.fn(),
  findCarById: jest.fn(),
  findAllCars: jest.fn(),
  updateCar: jest.fn().mockImplementation((car) => Promise.resolve(car)),
  deleteCarByPlate: jest.fn(),
  filteredCarsByColorOrBrand: jest.fn(),
});
