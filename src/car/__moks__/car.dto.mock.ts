import { CarRepository } from '../domain/repositories/car.repository';

export const mockDto = {
  plate: 'ABC123',
  color: 'blue',
  brand: 'Toyota',
};

export const mockCarRepository = (): jest.Mocked<CarRepository> => ({
  createCar: jest.fn(),
  findCarById: jest.fn(),
  findAllCars: jest.fn(),
  updateCar: jest.fn().mockImplementation((car) => Promise.resolve(car)),
  deleteCarByPlate: jest.fn(),
  filteredCarsByColorOrBrand: jest.fn(),
});
