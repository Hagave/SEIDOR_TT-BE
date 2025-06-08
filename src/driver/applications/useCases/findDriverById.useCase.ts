import { Injectable } from '@nestjs/common';
import { DriverEntity } from '../../../driver/domain/entities/driver.entity';
import { DriverRepository } from '../../../driver/domain/repositories/driver.repository';

@Injectable()
export class FindDriverByIdUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(driverId: string): Promise<DriverEntity | null> {
    const foundDriver = await this.driverRepository.findDriverById(driverId);

    return foundDriver ? foundDriver : null;
  }
}
