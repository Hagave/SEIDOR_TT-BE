import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingCarDto {
  @IsString()
  @IsNotEmpty()
  carId: string;

  @IsString()
  @IsNotEmpty()
  driverId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  bookedAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  deliveredAt: Date;
}
