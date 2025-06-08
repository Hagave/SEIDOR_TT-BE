import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarUseCase } from '../application/useCases/createCar.useCase';
import { FindAllCarsUseCase } from '../application/useCases/findAllCars.UseCase';
import { DeleteCarByIdUseCase } from '../application/useCases/deleteCarByPlate.UseCase';
import { FilteredCarsByColorOrBrandDto } from './dto/filtered-car.dto';
import { FilteredCarsByColorOrBrandUseCase } from '../application/useCases/filteredCarsByColorOrBrand.useCase';
import { FindCarByIdUseCase } from '../application/useCases/findCarById.useCase';
import { UpdateCarByIdUseCase } from '../application/useCases/updateCarById.useCase';

@Controller('car')
export class CarController {
  constructor(
    private readonly createCarUseCase: CreateCarUseCase,
    private readonly findCarByIdUseCase: FindCarByIdUseCase,
    private readonly findAllCarsUseCase: FindAllCarsUseCase,
    private readonly updateCarByIdUseCase: UpdateCarByIdUseCase,
    private readonly deleteCarByIdUseCase: DeleteCarByIdUseCase,
    private readonly filteredCarsByColorOrBrandUseCase: FilteredCarsByColorOrBrandUseCase,
  ) {}

  @Post()
  async createCar(@Body() createCarDto: CreateCarDto) {
    return this.createCarUseCase.execute(createCarDto);
  }

  @Get()
  async findAllCars() {
    return this.findAllCarsUseCase.execute();
  }

  @Get('filtered')
  filteredCars(
    @Query() filteredCarsByColorOrBrandDto: FilteredCarsByColorOrBrandDto,
  ) {
    return this.filteredCarsByColorOrBrandUseCase.execute(
      filteredCarsByColorOrBrandDto,
    );
  }

  @Get(':carId')
  findOneCarById(@Param('carId') carId: string) {
    return this.findCarByIdUseCase.execute(carId);
  }

  @Patch(':carId')
  updateCarById(
    @Param('carId') carId: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.updateCarByIdUseCase.execute(carId, updateCarDto);
  }

  @Delete(':plate')
  remove(@Param('plate') plate: string) {
    return this.deleteCarByIdUseCase.execute(plate);
  }
}
