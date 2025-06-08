import { Injectable } from '@nestjs/common';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';
import { DriverRepository } from 'src/driver/domain/repositories/driver.repository';
import { CreateDriverDto } from 'src/driver/interfaces/dto/create-driver.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(createDriverDto: CreateDriverDto): Promise<DriverEntity> {
    const newDriver = new DriverEntity(
      randomUUID(),
      createDriverDto.name,
      false,
    );

    return this.driverRepository.createDriver(newDriver);
  }
}
