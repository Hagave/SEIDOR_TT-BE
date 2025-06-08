import { Module } from '@nestjs/common';
import { BookingCarController } from './interfaces/booking-car.controller';
import { CarModule } from 'src/car/car.module';
import { DriverModule } from 'src/driver/driver.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { FindBookingCarByIdUseCase } from './applications/useCases/findBookingCarById.useCase';
import { FindAllBookingsCarsUseCase } from './applications/useCases/findAllBookingsCars.useCase';
import { DeliveryBookingCarUseCase } from './applications/useCases/deliveryBookingCar.useCase';
import { CreateBookingCarUseCase } from './applications/useCases/createBookingCar.useCase';
import { BookingCarRepository } from './domain/repositories/bookingCar.repository';
import { PrismaBookingRepository } from './infra/prisma/prisma.repository';

@Module({
  controllers: [BookingCarController],
  providers: [
    CreateBookingCarUseCase,
    DeliveryBookingCarUseCase,
    FindAllBookingsCarsUseCase,
    FindBookingCarByIdUseCase,
    {
      provide: BookingCarRepository,
      useClass: PrismaBookingRepository,
    },
  ],
  imports: [CarModule, DriverModule, PrismaModule],
})
export class BookingCarModule {}
