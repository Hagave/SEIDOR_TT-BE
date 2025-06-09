import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DriverRepository } from '../../../driver/domain/repositories/driver.repository';
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

    if (existDriver.getIsDriving())
      throw new NotAcceptableException(
        "This driver is currently on a trip. You can't delete them before the trip is finished.",
      );

    return this.driverRepository.deleteDriverById(driverId);
  }
}
