import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BookingCarEntity } from '../../../booking-car/domain/entities/booking-car.entity';
import { BookingCarRepository } from '../../../booking-car/domain/repositories/bookingCar.repository';
import { randomUUID } from 'node:crypto';
import { CreateBookingCarDto } from '../../../booking-car/interfaces/dto/create-booking-car.dto';
import { FindCarByIdUseCase } from '../../../car/application/useCases/findCarById.useCase';
import { FindDriverByIdUseCase } from '../../../driver/applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from '../../../driver/applications/useCases/updateDriverById.useCase';
import { UpdateCarByIdUseCase } from '../../../car/application/useCases/updateCarById.useCase';

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

    const driverPayload = { isDriving: true };
    const carPayload = { isReserved: true };

    const newBookedCar = new BookingCarEntity(
      randomUUID(),
      createBookingCarDto.carId,
      createBookingCarDto.driverId,
      createBookingCarDto.reason,
      createBookingCarDto.bookedAt,
      createBookingCarDto.deliveredAt,
      false,
    );

    try {
      await Promise.all([
        this.updateDriverByIdUseCase.execute(
          existDriver.getId(),
          driverPayload,
        ),
        this.updateCarByIdUseCase.execute(existCar.getId(), carPayload),
      ]);
    } catch {
      await Promise.allSettled([
        this.updateDriverByIdUseCase.execute(existDriver.getId(), {
          isDriving: false,
        }),
        this.updateCarByIdUseCase.execute(existCar.getId(), {
          isReserved: false,
        }),
      ]);
      throw new UnprocessableEntityException(
        'Was not possible to reserve car or driver. Please check both availability and try later',
      );
    }

    return this.bookingCarRepository.createBooking(newBookedCar);
  }
}
