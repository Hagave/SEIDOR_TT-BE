import { Injectable } from '@nestjs/common';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from 'src/booking-car/domain/repositories/bookingCar.repository';

@Injectable()
export class FindBookingCarByIdUseCase {
  constructor(private readonly bookingCarRepository: BookingCarRepository) {}

  async execute(bookingId: string): Promise<BookingCarEntity | null> {
    return this.bookingCarRepository.findBookingById(bookingId);
  }
}
