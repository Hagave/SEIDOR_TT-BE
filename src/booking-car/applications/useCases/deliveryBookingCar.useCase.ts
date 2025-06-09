import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingCarEntity } from '../../../booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from '../../../booking-car/domain/repositories/bookingCar.repository';
import { UpdateBookingCarDto } from '../../../booking-car/interfaces/dto/update-booking-car.dto';
import { FindCarByIdUseCase } from '../../../car/application/useCases/findCarById.useCase';
import { UpdateCarByIdUseCase } from '../../../car/application/useCases/updateCarById.useCase';
import { FindDriverByIdUseCase } from '../../../driver/applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from '../../../driver/applications/useCases/updateDriverById.useCase';
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
      throw new NotFoundException('Car or driver not found');

    const driverPayload = {
      isDriving: false,
    };

    const carPayload = {
      isReserved: false,
    };

    if (updateBookingCarDto.deliveredAt) {
      existBooking.updateDeliveryAt(updateBookingCarDto.deliveredAt);
    }
    if (typeof updateBookingCarDto.hasDelivery === 'boolean') {
      existBooking.updateHasDelivery(updateBookingCarDto.hasDelivery);
    }

    await this.updateDriverByIdUseCase.execute(
      existDriver.getId(),
      driverPayload,
    );
    await this.updateCarByIdUseCase.execute(existCar.getId(), carPayload);

    return this.bookingCarRepository.deliveryBooking(bookingId, existBooking);
  }
}
