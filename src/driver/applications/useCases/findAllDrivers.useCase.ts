import { Injectable } from '@nestjs/common';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';
import { DriverRepository } from 'src/driver/domain/repositories/driver.repository';

@Injectable()
export class FindAllDriversUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(): Promise<DriverEntity[]> {
    return this.driverRepository.findAllDriver();
  }
}
