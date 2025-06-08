import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingCarDto } from './create-booking-car.dto';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateBookingCarDto extends PartialType(CreateBookingCarDto) {
  @IsNotEmpty()
  @IsDate()
  deliveredAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  hasDelivery: boolean;
}
