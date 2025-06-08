import { Injectable, NotFoundException } from '@nestjs/common';
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
        `The car with plate or Id ${plateOrId} does not exist`,
      );
    return this.carRepository.deleteCarByPlate(existCar.getPlate());
  }
}
