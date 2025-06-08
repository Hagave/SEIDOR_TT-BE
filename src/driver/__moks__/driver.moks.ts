import { CreateDriverDto } from '../interfaces/dto/create-driver.dto';
import { UpdateDriverDto } from '../interfaces/dto/update-driver.dto';
import { DriverEntity } from '../domain/entities/driver.entity';
import { randomUUID } from 'node:crypto';
import { DriverRepository } from '../domain/repositories/driver.repository';

export const fakeDriver: CreateDriverDto = {
  name: 'Jhon Doe',
};

export const updateFakeDriverDto: UpdateDriverDto = {
  name: 'Chris',
  isDriving: true,
};

export const newFakeDriver = new DriverEntity(randomUUID(), 'Jhon Doe', false);

export const mockDriverRepository = (): jest.Mocked<DriverRepository> => ({
  createDriver: jest.fn(),
  findDriverById: jest.fn(),
  findAllDriver: jest.fn(),
  filteredDriversByName: jest.fn(),
  updateDriver: jest
    .fn()
    .mockImplementation((driver) => Promise.resolve(driver)),
  deleteDriverById: jest.fn(),
});
