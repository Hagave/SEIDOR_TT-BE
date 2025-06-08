import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BookingCarRepository } from 'src/booking-car/domain/repositories/bookingCar.repository';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';
import { BookingCarMapper } from 'src/booking-car/applications/mappers/bookingCar.mapper';

@Injectable()
export class PrismaBookingRepository implements BookingCarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(
    bookingCarEntity: BookingCarEntity,
  ): Promise<BookingCarEntity> {
    const newBookingCar = await this.prisma.bookCar.create({
      data: {
        id: bookingCarEntity.getId(),
        carId: bookingCarEntity.getCarId(),
        driverId: bookingCarEntity.getDriverId(),
        reason: bookingCarEntity.getreason(),
        bookedAt: bookingCarEntity.getBookedAt(),
        deliveredAt: bookingCarEntity.getDeliveredAt(),
      },
    });

    return BookingCarMapper.toEntity(newBookingCar);
  }

  async deliveryBooking(
    bookingId: string,
    bookingCarEntity: BookingCarEntity,
  ): Promise<BookingCarEntity> {
    const newDeliveryBookingCar = await this.prisma.bookCar.update({
      where: { id: bookingId },
      data: {
        id: bookingCarEntity.getId(),
        carId: bookingCarEntity.getCarId(),
        driverId: bookingCarEntity.getDriverId(),
        reason: bookingCarEntity.getreason(),
        bookedAt: bookingCarEntity.getBookedAt(),
        deliveredAt: bookingCarEntity.getDeliveredAt(),
      },
    });
    return BookingCarMapper.toEntity(newDeliveryBookingCar);
  }

  async findAllBookings(): Promise<BookingCarEntity[]> {
    const foundAllBookings = await this.prisma.bookCar.findMany();

    return foundAllBookings.map((foundAllBook) =>
      BookingCarMapper.toEntity(foundAllBook),
    );
  }

  async findBookingById(bookingId: string): Promise<BookingCarEntity | null> {
    const existBooking = await this.prisma.bookCar.findUnique({
      where: { id: bookingId },
    });
    return existBooking ? BookingCarMapper.toEntity(existBooking) : null;
  }
}
