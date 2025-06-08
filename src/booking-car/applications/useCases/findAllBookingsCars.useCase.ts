import { Injectable } from '@nestjs/common';
import { BookingCarEntity } from '../../../booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from '../../../booking-car/domain/repositories/bookingCar.repository';

@Injectable()
export class FindAllBookingsCarsUseCase {
  constructor(private readonly bookingCarRepository: BookingCarRepository) {}
  async execute(): Promise<BookingCarEntity[]> {
    return this.bookingCarRepository.findAllBookings();
  }
}
