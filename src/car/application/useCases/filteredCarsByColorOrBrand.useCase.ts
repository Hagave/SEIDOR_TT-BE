import { Injectable } from '@nestjs/common';
import { CarEntity } from '../../../car/domain/entities/car.entity';
import { CarRepository } from '../../../car/domain/repositories/car.repository';
import { FilteredCarsByColorOrBrandDto } from 'src/car/interfaces/dto/filtered-car.dto';

@Injectable()
export class FilteredCarsByColorOrBrandUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    filteredCarsByColorOrBrandDto: FilteredCarsByColorOrBrandDto,
  ): Promise<CarEntity[]> {
    return this.carRepository.filteredCarsByColorOrBrand(
      filteredCarsByColorOrBrandDto.color,
      filteredCarsByColorOrBrandDto.brand,
    );
  }
}
