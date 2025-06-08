import { NotFoundException } from '@nestjs/common';
import {
  createNewFakeBooking,
  mockBookingRepository,
  updateFakeBookingDto,
} from '../__moks__/booking.moks';
import { DeliveryBookingCarUseCase } from '../applications/useCases/deliveryBookingCar.useCase';
import { FindCarByIdUseCase } from '../../car/application/useCases/findCarById.useCase';
import { FindDriverByIdUseCase } from '../../driver/applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from '../../driver/applications/useCases/updateDriverById.useCase';
import { UpdateCarByIdUseCase } from '../../car/application/useCases/updateCarById.useCase';
import { FindBookingCarByIdUseCase } from '../applications/useCases/findBookingCarById.useCase';
import { newFakeDriver } from '../../driver/__moks__/driver.moks';
import { existingCar } from '../../car/__moks__/car.mock';

describe('DeliveryBookingCarUseCase', () => {
  let useCase: DeliveryBookingCarUseCase;

  let bookingCarRepositoryMock: ReturnType<typeof mockBookingRepository>;
  let findCarByIdUseCaseMock: jest.Mocked<FindCarByIdUseCase>;
  let findDriverByIdUseCaseMock: jest.Mocked<FindDriverByIdUseCase>;
  let updateDriverByIdUseCaseMock: jest.Mocked<UpdateDriverByIdUseCase>;
  let updateCarByIdUseCaseMock: jest.Mocked<UpdateCarByIdUseCase>;
  let findBookingCarByIdUseCaseMock: jest.Mocked<FindBookingCarByIdUseCase>;

  const bookingId = 'booking-123';

  beforeEach(() => {
    jest.clearAllMocks();

    bookingCarRepositoryMock = mockBookingRepository();

    findCarByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindCarByIdUseCase>;

    findDriverByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindDriverByIdUseCase>;

    updateDriverByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateDriverByIdUseCase>;

    updateCarByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateCarByIdUseCase>;

    findBookingCarByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindBookingCarByIdUseCase>;

    useCase = new DeliveryBookingCarUseCase(
      bookingCarRepositoryMock,
      findCarByIdUseCaseMock,
      findDriverByIdUseCaseMock,
      updateDriverByIdUseCaseMock,
      updateCarByIdUseCaseMock,
      findBookingCarByIdUseCaseMock,
    );
  });

  it('should throw NotFoundException if booking does not exist', async () => {
    findBookingCarByIdUseCaseMock.execute.mockResolvedValue(null);

    await expect(
      useCase.execute(bookingId, updateFakeBookingDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if car or driver do not exist', async () => {
    findBookingCarByIdUseCaseMock.execute.mockResolvedValue(
      createNewFakeBooking,
    );
    findCarByIdUseCaseMock.execute.mockResolvedValue(null);
    findDriverByIdUseCaseMock.execute.mockResolvedValue(null);

    await expect(
      useCase.execute(bookingId, updateFakeBookingDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update booking delivery info, update car and driver, and return updated booking', async () => {
    findBookingCarByIdUseCaseMock.execute.mockResolvedValue(
      createNewFakeBooking,
    );
    findCarByIdUseCaseMock.execute.mockResolvedValue(existingCar);
    findDriverByIdUseCaseMock.execute.mockResolvedValue(newFakeDriver);

    updateDriverByIdUseCaseMock.execute.mockResolvedValue(newFakeDriver);
    updateCarByIdUseCaseMock.execute.mockResolvedValue(existingCar);

    bookingCarRepositoryMock.deliveryBooking.mockResolvedValue(
      createNewFakeBooking,
    );

    const updateDeliveryAtSpy = jest.spyOn(
      createNewFakeBooking,
      'updateDeliveryAt',
    );
    const updateHasDeliverySpy = jest.spyOn(
      createNewFakeBooking,
      'updateHasDelivery',
    );

    const result = await useCase.execute(bookingId, updateFakeBookingDto);

    const spyBookingCar = jest.spyOn(findBookingCarByIdUseCaseMock, 'execute');

    expect(spyBookingCar).toHaveBeenCalledWith(bookingId);

    const spyIndCarById = jest.spyOn(findCarByIdUseCaseMock, 'execute');
    expect(spyIndCarById).toHaveBeenCalledWith(createNewFakeBooking.getCarId());

    const spyFindDriverBy = jest.spyOn(findDriverByIdUseCaseMock, 'execute');
    expect(spyFindDriverBy).toHaveBeenCalledWith(
      createNewFakeBooking.getDriverId(),
    );

    expect(updateDeliveryAtSpy).toHaveBeenCalledWith(
      updateFakeBookingDto.deliveredAt,
    );
    expect(updateHasDeliverySpy).toHaveBeenCalledWith(
      updateFakeBookingDto.hasDelivery,
    );

    const spyUpdateDriverBy = jest.spyOn(
      updateDriverByIdUseCaseMock,
      'execute',
    );
    expect(spyUpdateDriverBy).toHaveBeenCalledWith(newFakeDriver.getId(), {
      isDriving: false,
    });

    const spyUpdateCarByIdUse = jest.spyOn(updateCarByIdUseCaseMock, 'execute');
    expect(spyUpdateCarByIdUse).toHaveBeenCalledWith(existingCar.getId(), {
      isReserved: false,
    });

    const spyBookingCarRepository = jest.spyOn(
      bookingCarRepositoryMock,
      'deliveryBooking',
    );
    expect(spyBookingCarRepository).toHaveBeenCalledWith(
      bookingId,
      createNewFakeBooking,
    );

    expect(result).toBe(createNewFakeBooking);
  });
});
