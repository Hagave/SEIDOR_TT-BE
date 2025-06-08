import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from 'src/booking-car/domain/repositories/bookingCar.repository';
import { randomUUID } from 'node:crypto';
import { CreateBookingCarDto } from 'src/booking-car/interfaces/dto/create-booking-car.dto';
import { FindCarByIdUseCase } from 'src/car/application/useCases/findCarById.useCase';
import { FindDriverByIdUseCase } from 'src/driver/applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from 'src/driver/applications/useCases/updateDriverById.useCase';
import { UpdateCarByIdUseCase } from 'src/car/application/useCases/updateCarById.useCase';

@Injectable()
export class CreateBookingCarUseCase {
  constructor(
    private readonly bookingCarRepository: BookingCarRepository,
    private readonly findCarByIdUseCase: FindCarByIdUseCase,
    private readonly findDriverByIdUseCase: FindDriverByIdUseCase,
    private readonly updateDriverByIdUseCase: UpdateDriverByIdUseCase,
    private readonly updateCarByIdUseCase: UpdateCarByIdUseCase,
  ) {}

  async execute(
    createBookingCarDto: CreateBookingCarDto,
  ): Promise<BookingCarEntity> {
    const existCar = await this.findCarByIdUseCase.execute(
      createBookingCarDto.carId,
    );

    const existDriver = await this.findDriverByIdUseCase.execute(
      createBookingCarDto.driverId,
    );

    if (!existCar || !existDriver)
      throw new NotFoundException('The car or driver were not found');

    if (existCar.getIsReserved() || existDriver.getIsDriving())
      throw new ConflictException(
        'The Car or Driver already driving or in use',
      );

    const driverPayload = {
      isDriving: true,
    };

    const carPayload = {
      isReserved: true,
    };

    const newBookedCar = new BookingCarEntity(
      randomUUID(),
      createBookingCarDto.carId,
      createBookingCarDto.driverId,
      createBookingCarDto.reason,
      createBookingCarDto.bookedAt,
      createBookingCarDto.deliveredAt,
    );
    await this.updateDriverByIdUseCase.execute(
      existDriver.getId(),
      driverPayload,
    );
    await this.updateCarByIdUseCase.execute(existCar.getId(), carPayload);
    return this.bookingCarRepository.createBooking(newBookedCar);
  }
}
