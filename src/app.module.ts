import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { CarModule } from './car/car.module';
import { BookingCarModule } from './booking-car/booking-car.module';

@Module({
  imports: [DriverModule, CarModule, BookingCarModule],
})
export class AppModule {}
