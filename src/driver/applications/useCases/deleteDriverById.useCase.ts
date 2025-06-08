import { Injectable, NotFoundException } from '@nestjs/common';
import { DriverRepository } from 'src/driver/domain/repositories/driver.repository';
import { FindDriverByIdUseCase } from './findDriverById.useCase';

@Injectable()
export class DeleteDriverByIdUseCase {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly findDriverByIdUseCase: FindDriverByIdUseCase,
  ) {}

  async execute(driverId: string): Promise<void> {
    const existDriver = await this.findDriverByIdUseCase.execute(driverId);

    if (!existDriver)
      throw new NotFoundException(
        `The Driver with id: ${driverId} does not exist`,
      );

    return this.driverRepository.deleteDriverById(driverId);
  }
}
