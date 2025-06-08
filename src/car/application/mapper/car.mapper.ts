import { Car } from 'generated/prisma';
import { CarEntity } from 'src/car/domain/entities/car.entity';

export class CarMapper {
  static toEntity(car: Car): CarEntity {
    return new CarEntity(
      car.id,
      car.plate,
      car.color,
      car.brand,
      car.isReserved,
    );
  }

  static toPrisma(newCar: CarEntity) {
    return {
      id: newCar.getId(),
      plate: newCar.getPlate(),
      color: newCar.getColor(),
      brand: newCar.getBrand(),
      car: newCar.getIsReserved(),
    };
  }
}
