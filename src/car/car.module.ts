import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/prisma/prisma.module';
import { CarController } from './interfaces/car.controller';
import { CreateCarUseCase } from './application/useCases/createCar.useCase';
import { DeleteCarByIdUseCase } from './application/useCases/deleteCarByPlate.UseCase';
import { FindAllCarsUseCase } from './application/useCases/findAllCars.UseCase';
import { FindCarByIdUseCase } from './application/useCases/findCarById.useCase';
import { CarRepository } from './domain/repositories/car.repository';
import { PrismaCarRepository } from './infra/prisma/prisma.repository';
import { FilteredCarsByColorOrBrandUseCase } from './application/useCases/filteredCarsByColorOrBrand.useCase';
import { UpdateCarByIdUseCase } from './application/useCases/updateCarById.useCase';

@Module({
  controllers: [CarController],
  providers: [
    CreateCarUseCase,
    DeleteCarByIdUseCase,
    FilteredCarsByColorOrBrandUseCase,
    FindAllCarsUseCase,
    FindCarByIdUseCase,
    UpdateCarByIdUseCase,
    {
      provide: CarRepository,
      useClass: PrismaCarRepository,
    },
  ],
  exports: [FindCarByIdUseCase, UpdateCarByIdUseCase],
  imports: [PrismaModule],
})
export class CarModule {}
