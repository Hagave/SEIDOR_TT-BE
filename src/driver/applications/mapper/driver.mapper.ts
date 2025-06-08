import { Driver } from 'generated/prisma';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';

export class DriverMapper {
  static toEntity(driver: Driver): DriverEntity {
    return new DriverEntity(driver.id, driver.name, driver.isDriving);
  }

  static toPrisma(newDriver: DriverEntity) {
    return {
      id: newDriver.getId(),
      name: newDriver.getName(),
      isDriving: newDriver.getIsDriving(),
    };
  }
}
