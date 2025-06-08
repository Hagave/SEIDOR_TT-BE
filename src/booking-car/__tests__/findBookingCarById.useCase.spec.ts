import { FindBookingCarByIdUseCase } from '../applications/useCases/findBookingCarById.useCase';
import {
  mockBookingRepository,
  createNewFakeBooking,
} from '../__moks__/booking.moks';
import { BookingCarEntity } from '../domain/entities/booking-car.entity';

describe('FindBookingCarByIdUseCase', () => {
  let useCase: FindBookingCarByIdUseCase;
  let bookingCarRepositoryMock: ReturnType<typeof mockBookingRepository>;

  beforeEach(() => {
    bookingCarRepositoryMock = mockBookingRepository();

    useCase = new FindBookingCarByIdUseCase(bookingCarRepositoryMock);
  });

  it('should return booking if found', async () => {
    bookingCarRepositoryMock.findBookingById.mockResolvedValue(
      createNewFakeBooking,
    );

    const result = await useCase.execute('booking-123');

    const spy = jest.spyOn(bookingCarRepositoryMock, 'findBookingById');

    expect(spy).toHaveBeenCalledWith('booking-123');
    expect(result).toEqual(createNewFakeBooking);
    expect(result).toBeInstanceOf(BookingCarEntity);
  });

  it('should return null if booking not found', async () => {
    bookingCarRepositoryMock.findBookingById.mockResolvedValue(null);

    const result = await useCase.execute('NOT_FOUND');

    const spy = jest.spyOn(bookingCarRepositoryMock, 'findBookingById');

    expect(result).toBeNull();
    expect(spy).toHaveBeenCalledWith('NOT_FOUND');
  });
});
