import { Injectable, NotFoundException } from '@nestjs/common';
import { CarEntity } from '../../../car/domain/entities/car.entity';
import { CarRepository } from '../../../car/domain/repositories/car.repository';
import { UpdateCarDto } from '../../../car/interfaces/dto/update-car.dto';
import { FindCarByIdUseCase } from './findCarById.useCase';

@Injectable()
export class UpdateCarByIdUseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly findCarByIdUseCase: FindCarByIdUseCase,
  ) {}

  async execute(carId: string, updateCarDto: UpdateCarDto): Promise<CarEntity> {
    const existCar = await this.findCarByIdUseCase.execute(carId);

    if (!existCar)
      throw new NotFoundException(`Car with ID "${carId}" was not found.`);

    if (updateCarDto.brand) {
      existCar.updateBrand(updateCarDto.brand);
    }

    if (updateCarDto.color) {
      existCar.updateColor(updateCarDto.color);
    }

    if (typeof updateCarDto.isReserved === 'boolean') {
      existCar.updateReserve(updateCarDto.isReserved);
    }

    if (updateCarDto.plate) {
      existCar.updatePlate(updateCarDto.plate);
    }

    return this.carRepository.updateCar(existCar);
  }
}
