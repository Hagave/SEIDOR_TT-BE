import { randomUUID } from 'node:crypto';
import { BookingCarEntity } from '../domain/entities/booking-car.entity';
import { BookingCarRepository } from '../domain/repositories/bookingCar.repository';
import { CreateBookingCarDto } from '../interfaces/dto/create-booking-car.dto';
import { UpdateBookingCarDto } from '../interfaces/dto/update-booking-car.dto';

export const mockBookingRepository = (): jest.Mocked<BookingCarRepository> => ({
  createBooking: jest.fn(),
  findBookingById: jest.fn(),
  findAllBookings: jest.fn(),
  deliveryBooking: jest.fn(),
});

export const createNewFakeBooking = new BookingCarEntity(
  randomUUID(),
  'carId-a6sd51as65d1',
  'driverId-6as51da65sd',
  'reason-business trip',
  new Date('2025-12-30'),
  new Date('2025-12-31'),
  false,
);

export const createFakeBookingDto: CreateBookingCarDto = {
  carId: 'carId-asdas51d6a5s165',
  driverId: 'driverId-a85sd9a1sda9',
  reason: 'some reason',
  bookedAt: new Date('2023-01-30'),
  deliveredAt: new Date('2023-01-31'),
};

export const updateFakeBookingDto: UpdateBookingCarDto = {
  deliveredAt: new Date('2023-01-31'),
  hasDelivery: true,
};
