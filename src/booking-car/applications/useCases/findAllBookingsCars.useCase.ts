import { Injectable } from '@nestjs/common';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from 'src/booking-car/domain/repositories/bookingCar.repository';

@Injectable()
export class FindAllBookingsCarsUseCase {
  constructor(private readonly bookingCarRepository: BookingCarRepository) {}
  async execute(): Promise<BookingCarEntity[]> {
    return this.bookingCarRepository.findAllBookings();
  }
}
