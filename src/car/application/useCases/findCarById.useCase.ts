import { Injectable } from '@nestjs/common';
import { CarEntity } from '../../../car/domain/entities/car.entity';
import { CarRepository } from '../../../car/domain/repositories/car.repository';

@Injectable()
export class FindCarByIdUseCase {
  constructor(private readonly CarRepoitory: CarRepository) {}

  async execute(carId: string): Promise<CarEntity | null> {
    const foundCar = await this.CarRepoitory.findCarById(carId);

    return foundCar ? foundCar : null;
  }
}
