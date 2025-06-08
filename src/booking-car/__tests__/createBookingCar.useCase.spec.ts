import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBookingCarUseCase } from '../applications/useCases/createBookingCar.useCase';
import {
  createFakeBookingDto,
  mockBookingRepository,
} from '../__moks__/booking.moks';
import { FindCarByIdUseCase } from '../../car/application/useCases/findCarById.useCase';
import { FindDriverByIdUseCase } from '../../driver/applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from '../../driver/applications/useCases/updateDriverById.useCase';
import { UpdateCarByIdUseCase } from '../../car/application/useCases/updateCarById.useCase';
import { existingCar } from '../../car/__moks__/car.mock';
import { newFakeDriver } from '../../driver/__moks__/driver.moks';
import { BookingCarEntity } from '../domain/entities/booking-car.entity';

describe('CreateBookingCarUseCase', () => {
  let createBookingCarUseCase: CreateBookingCarUseCase;
  let bookingCarRepositoryMock = mockBookingRepository();
  let mockFindCarByIdUseCase: jest.Mocked<FindCarByIdUseCase>;
  let mockFindDriverByIdUseCase: jest.Mocked<FindDriverByIdUseCase>;
  let mockUpdateDriverByIdUseCase: jest.Mocked<UpdateDriverByIdUseCase>;
  let mockUpdateCarByIdUseCase: jest.Mocked<UpdateCarByIdUseCase>;

  beforeEach(() => {
    bookingCarRepositoryMock = mockBookingRepository();

    mockFindCarByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindCarByIdUseCase>;

    mockFindDriverByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindDriverByIdUseCase>;

    mockUpdateDriverByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateDriverByIdUseCase>;

    mockUpdateCarByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateCarByIdUseCase>;

    createBookingCarUseCase = new CreateBookingCarUseCase(
      bookingCarRepositoryMock,
      mockFindCarByIdUseCase,
      mockFindDriverByIdUseCase,
      mockUpdateDriverByIdUseCase,
      mockUpdateCarByIdUseCase,
    );

    jest.clearAllMocks();
  });

  it('should create booking successfully', async () => {
    mockFindCarByIdUseCase.execute.mockResolvedValue(existingCar);
    mockFindDriverByIdUseCase.execute.mockResolvedValue(newFakeDriver);
    mockUpdateDriverByIdUseCase.execute.mockResolvedValue(newFakeDriver);
    mockUpdateCarByIdUseCase.execute.mockResolvedValue(existingCar);
    bookingCarRepositoryMock.createBooking.mockImplementation(async (booking) =>
      Promise.resolve(booking),
    );

    const result = await createBookingCarUseCase.execute(createFakeBookingDto);

    const spyCar = jest.spyOn(mockFindCarByIdUseCase, 'execute');
    const spyDriver = jest.spyOn(mockFindDriverByIdUseCase, 'execute');
    const updateDriveSpy = jest.spyOn(mockUpdateDriverByIdUseCase, 'execute');
    const updateCarSpy = jest.spyOn(mockUpdateCarByIdUseCase, 'execute');
    const carRepository = jest.spyOn(bookingCarRepositoryMock, 'createBooking');

    expect(spyCar).toHaveBeenCalledWith(createFakeBookingDto.carId);

    expect(spyDriver).toHaveBeenCalledWith(createFakeBookingDto.driverId);

    expect(updateDriveSpy).toHaveBeenCalledWith(newFakeDriver.getId(), {
      isDriving: true,
    });

    expect(updateCarSpy).toHaveBeenCalledWith(existingCar.getId(), {
      isReserved: true,
    });

    expect(carRepository).toHaveBeenCalled();
    expect(result).toBeInstanceOf(BookingCarEntity);
  });

  it('should throw NotFoundException if car or driver not found', async () => {
    mockFindCarByIdUseCase.execute.mockResolvedValue(null);
    mockFindDriverByIdUseCase.execute.mockResolvedValue(null);

    await expect(
      createBookingCarUseCase.execute(createFakeBookingDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw ConflictException if car is reserved', async () => {
    jest.spyOn(existingCar, 'getIsReserved').mockReturnValue(true);
    mockFindCarByIdUseCase.execute.mockResolvedValue(existingCar);
    mockFindDriverByIdUseCase.execute.mockResolvedValue(newFakeDriver);

    await expect(
      createBookingCarUseCase.execute(createFakeBookingDto),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if driver is already driving', async () => {
    mockFindCarByIdUseCase.execute.mockResolvedValue(existingCar);
    mockFindDriverByIdUseCase.execute.mockResolvedValue(newFakeDriver);

    await expect(
      createBookingCarUseCase.execute(createFakeBookingDto),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if car is reserved or driver is driving', async () => {
    mockFindCarByIdUseCase.execute.mockResolvedValue(existingCar);
    mockFindDriverByIdUseCase.execute.mockResolvedValue(newFakeDriver);

    await expect(
      createBookingCarUseCase.execute(createFakeBookingDto),
    ).rejects.toThrow(ConflictException);
  });
});
