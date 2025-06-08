import { BookCar } from 'generated/prisma';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';
import { CarEntity } from 'src/car/domain/entities/car.entity';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';

export class BookingCarMapper {
  static toEntity(
    bookingCar: BookCar,
    car?: CarEntity,
    driver?: DriverEntity,
  ): BookingCarEntity {
    return new BookingCarEntity(
      bookingCar.id,
      bookingCar.carId,
      bookingCar.driverId,
      bookingCar.reason,
      bookingCar.bookedAt,
      bookingCar.deliveredAt,
      car,
      driver,
    );
  }

  static toPrisma(bookingCarEntity: BookingCarEntity) {
    return {
      id: bookingCarEntity.getId(),
      carId: bookingCarEntity.getCarId(),
      driverId: bookingCarEntity.getDriverId(),
      reason: bookingCarEntity.getreason(),
      bookedAt: bookingCarEntity.getBookedAt(),
      deliveredAt: bookingCarEntity.getDeliveredAt(),
    };
  }
}
