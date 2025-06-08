import { BookCar } from 'generated/prisma';
import { BookingCarEntity } from 'src/booking-car/domain/entities/booking-car.entity';

export class BookingCarMapper {
  static toEntity(bookingCar: BookCar): BookingCarEntity {
    return new BookingCarEntity(
      bookingCar.id,
      bookingCar.carId,
      bookingCar.driverId,
      bookingCar.reason,
      bookingCar.bookedAt,
      bookingCar.deliveredAt,
      bookingCar.hasDelivery,
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
      hasDelivery: bookingCarEntity.gethasDelivery(),
    };
  }
}
