import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CarRepository } from '../../../car/domain/repositories/car.repository';
import { FindCarByIdUseCase } from './findCarById.useCase';

@Injectable()
export class DeleteCarByIdUseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly findCarByIdUseCase: FindCarByIdUseCase,
  ) {}

  async execute(plateOrId: string): Promise<void> {
    const existCar = await this.findCarByIdUseCase.execute(plateOrId);

    if (!existCar)
      throw new NotFoundException(
        `Car with plate or ID "${plateOrId}" was not found.`,
      );

    if (existCar.getIsReserved())
      throw new NotAcceptableException(
        "This car is currently reserved. You can't delete it until the trip is completed.",
      );

    return this.carRepository.deleteCarByPlate(existCar.getPlate());
  }
}
