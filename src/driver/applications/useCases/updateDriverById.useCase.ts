import { Injectable, NotFoundException } from '@nestjs/common';
import { DriverEntity } from '../../../driver/domain/entities/driver.entity';
import { DriverRepository } from '../../../driver/domain/repositories/driver.repository';
import { UpdateDriverDto } from '../../../driver/interfaces/dto/update-driver.dto';
import { FindDriverByIdUseCase } from './findDriverById.useCase';

@Injectable()
export class UpdateDriverByIdUseCase {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly findDriverByIdUseCase: FindDriverByIdUseCase,
  ) {}

  async execute(
    driverId: string,
    updateDriverDto: UpdateDriverDto,
  ): Promise<DriverEntity> {
    const existDriver = await this.findDriverByIdUseCase.execute(driverId);

    if (!existDriver)
      throw new NotFoundException(`Driver with id ${driverId} does not exist`);

    if (updateDriverDto.name) {
      existDriver.updateName(updateDriverDto.name);
    }
    if (typeof updateDriverDto.isDriving === 'boolean') {
      existDriver.updateIsDriving(updateDriverDto.isDriving);
    }

    return this.driverRepository.updateDriver(driverId, existDriver);
  }
}
