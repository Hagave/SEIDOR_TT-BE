import { BookingCarEntity } from '../entities/booking-car.entity';

export abstract class BookingCarRepository {
  abstract createBooking(
    bookingCarEntity: BookingCarEntity,
  ): Promise<BookingCarEntity>;
  abstract findBookingById(bookingId: string): Promise<BookingCarEntity | null>;
  abstract findAllBookings(): Promise<BookingCarEntity[]>;
  abstract deliveryBooking(
    bookingId: string,
    bookingCarEntity: BookingCarEntity,
  ): Promise<BookingCarEntity>;
}
