import { Injectable } from '@nestjs/common';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';
import { DriverRepository } from 'src/driver/domain/repositories/driver.repository';
import { FilteredDriversDto } from 'src/driver/interfaces/dto/filteredDrivers.dto';

@Injectable()
export class FilteredDriversUseCase {
  constructor(private readonly driverrepository: DriverRepository) {}

  async execute(
    filteredDriversDto: FilteredDriversDto,
  ): Promise<DriverEntity[]> {
    return this.driverrepository.filteredDriversByName(filteredDriversDto.name);
  }
}
