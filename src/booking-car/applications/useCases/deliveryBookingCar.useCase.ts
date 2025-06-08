import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from 'src/booking-car/domain/repositories/bookingCar.repository';
import { UpdateBookingCarDto } from 'src/booking-car/interfaces/dto/update-booking-car.dto';
import { FindCarByIdUseCase } from 'src/car/application/useCases/findCarById.useCase';
import { UpdateCarByIdUseCase } from 'src/car/application/useCases/updateCarById.useCase';
import { FindDriverByIdUseCase } from 'src/driver/applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from 'src/driver/applications/useCases/updateDriverById.useCase';
import { FindBookingCarByIdUseCase } from './findBookingCarById.useCase';

@Injectable()
export class DeliveryBookingCarUseCase {
  constructor(
    private readonly bookingCarRepository: BookingCarRepository,
    private readonly findCarByIdUseCase: FindCarByIdUseCase,
    private readonly findDriverByIdUseCase: FindDriverByIdUseCase,
    private readonly updateDriverByIdUseCase: UpdateDriverByIdUseCase,
    private readonly updateCarByIdUseCase: UpdateCarByIdUseCase,
    private readonly findBookingCarByIdUseCase: FindBookingCarByIdUseCase,
  ) {}

  async execute(
    bookingId: string,
    updateBookingCarDto: UpdateBookingCarDto,
  ): Promise<BookingCarEntity> {
    const existBooking =
      await this.findBookingCarByIdUseCase.execute(bookingId);

    if (!existBooking) throw new NotFoundException('Booking does not exist');

    const existCar = await this.findCarByIdUseCase.execute(
      existBooking.getCarId(),
    );

    const existDriver = await this.findDriverByIdUseCase.execute(
      existBooking.getDriverId(),
    );

    if (!existCar || !existDriver)
      throw new NotFoundException('The car or driver were not found');

    const driverPayload = {
      isDriving: false,
    };

    const carPayload = {
      isReserved: false,
    };

    if (updateBookingCarDto.deliveredAt) {
      existBooking.updateDeliveryAt(updateBookingCarDto.deliveredAt);
    }

    await this.updateDriverByIdUseCase.execute(
      existDriver.getId(),
      driverPayload,
    );
    await this.updateCarByIdUseCase.execute(existCar.getId(), carPayload);
    return this.bookingCarRepository.deliveryBooking(bookingId, existBooking);
  }
}
