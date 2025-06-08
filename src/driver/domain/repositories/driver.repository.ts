import { DriverEntity } from '../entities/driver.entity';

export abstract class DriverRepository {
  abstract createDriver(driverEntity: DriverEntity): Promise<DriverEntity>;
  abstract findDriverById(driverId: string): Promise<DriverEntity | null>;
  abstract findAllDriver(): Promise<DriverEntity[]>;
  abstract filteredDriversByName(name: string): Promise<DriverEntity[]>;
  abstract updateDriver(
    driverId: string,
    driverEntity: DriverEntity,
  ): Promise<DriverEntity>;
  abstract deleteDriverById(driverId: string): Promise<void>;
}
