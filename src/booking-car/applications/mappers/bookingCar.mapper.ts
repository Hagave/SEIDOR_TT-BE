import { BookCar, Car, Driver } from 'generated/prisma';
import { BookingCarEntity } from '../../../booking-car/domain/entities/booking-car.entity';
import { CarMapper } from '../../../car/application/mapper/car.mapper';
import { DriverMapper } from '../../../driver/applications/mapper/driver.mapper';

export class BookingCarMapper {
  static toEntity(
    bookingCar: BookCar & { car?: Car; driver?: Driver },
  ): BookingCarEntity {
    return new BookingCarEntity(
      bookingCar.id,
      bookingCar.carId,
      bookingCar.driverId,
      bookingCar.reason,
      bookingCar.bookedAt,
      bookingCar.deliveredAt,
      bookingCar.hasDelivery,
      bookingCar.car ? CarMapper.toEntity(bookingCar.car) : undefined,
      bookingCar.driver ? DriverMapper.toEntity(bookingCar.driver) : undefined,
    );
  }

  static toPrisma(entity: BookingCarEntity) {
    return {
      id: entity.getId(),
      carId: entity.getCarId(),
      driverId: entity.getDriverId(),
      reason: entity.getreason(),
      bookedAt: entity.getBookedAt(),
      deliveredAt: entity.getDeliveredAt(),
      hasDelivery: entity.gethasDelivery(),
    };
  }
}
