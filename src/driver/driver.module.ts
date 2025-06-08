import { Module } from '@nestjs/common';
import { DriverController } from './interfaces/driver.controller';
import { CreateDriverUseCase } from './applications/useCases/createDriver.useCase';
import { DeleteDriverByIdUseCase } from './applications/useCases/deleteDriverById.useCase';
import { FindAllDriversUseCase } from './applications/useCases/findAllDrivers.useCase';
import { FindDriverByIdUseCase } from './applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from './applications/useCases/updateDriverById.useCase';
import { DriverRepository } from './domain/repositories/driver.repository';
import { PrismaDriverRepository } from './infra/prisma/prisma.repository';
import { PrismaModule } from './infra/prisma/prisma.module';
import { FilteredDriversUseCase } from './applications/useCases/filteredDrivers.useCase';

@Module({
  controllers: [DriverController],
  providers: [
    CreateDriverUseCase,
    DeleteDriverByIdUseCase,
    FindAllDriversUseCase,
    FindDriverByIdUseCase,
    UpdateDriverByIdUseCase,
    FilteredDriversUseCase,
    {
      provide: DriverRepository,
      useClass: PrismaDriverRepository,
    },
  ],
  imports: [PrismaModule],
  exports: [UpdateDriverByIdUseCase, FindDriverByIdUseCase],
})
export class DriverModule {}
