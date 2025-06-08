import {
  createNewFakeBooking,
  mockBookingRepository,
} from '../__moks__/booking.moks';
import { FindAllBookingsCarsUseCase } from '../applications/useCases/findAllBookingsCars.useCase';

describe('FindAllBookingsCarsUseCase', () => {
  let useCase: FindAllBookingsCarsUseCase;
  let bookingCarRepositoryMock: ReturnType<typeof mockBookingRepository>;

  beforeEach(() => {
    bookingCarRepositoryMock = mockBookingRepository();
    useCase = new FindAllBookingsCarsUseCase(bookingCarRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return all booking car entities', async () => {
    const mockBookings = [createNewFakeBooking, createNewFakeBooking];

    bookingCarRepositoryMock.findAllBookings.mockResolvedValue(mockBookings);

    const result = await useCase.execute();

    const spy = jest.spyOn(bookingCarRepositoryMock, 'findAllBookings');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockBookings);
  });

  it('should propagate errors thrown by repository', async () => {
    bookingCarRepositoryMock.findAllBookings.mockRejectedValue(
      new Error('Database failure'),
    );

    await expect(useCase.execute()).rejects.toThrow('Database failure');
  });
});
