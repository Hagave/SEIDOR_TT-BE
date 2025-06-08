import { ConflictException, Injectable } from '@nestjs/common';
import { CarEntity } from '../../../car/domain/entities/car.entity';
import { CarRepository } from '../../../car/domain/repositories/car.repository';
import { CreateCarDto } from '../../../car/interfaces/dto/create-car.dto';
import { FindCarByIdUseCase } from './findCarById.useCase';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateCarUseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly findCarByIdUseCase: FindCarByIdUseCase,
  ) {}

  async execute(createCarDto: CreateCarDto): Promise<CarEntity> {
    const existCar = await this.findCarByIdUseCase.execute(createCarDto.plate);

    if (existCar) {
      throw new ConflictException(
        `The Car with this plate ${existCar.getPlate()} already exists.`,
      );
    }

    const newCar = new CarEntity(
      randomUUID(),
      createCarDto.plate,
      createCarDto.color,
      createCarDto.brand,
      false,
    );

    return this.carRepository.createCar(newCar);
  }
}
