import { Injectable } from '@nestjs/common';
import { CarEntity } from '../../../car/domain/entities/car.entity';
import { CarRepository } from '../../../car/domain/repositories/car.repository';

@Injectable()
export class FindAllCarsUseCase {
  constructor(private readonly carRespository: CarRepository) {}

  async execute(): Promise<CarEntity[]> {
    return this.carRespository.findAllCars();
  }
}
