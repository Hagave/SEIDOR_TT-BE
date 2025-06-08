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
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { CreateDriverUseCase } from '../applications/useCases/createDriver.useCase';
import { FindAllDriversUseCase } from '../applications/useCases/findAllDrivers.useCase';
import { FindDriverByIdUseCase } from '../applications/useCases/findDriverById.useCase';
import { UpdateDriverByIdUseCase } from '../applications/useCases/updateDriverById.useCase';
import { DeleteDriverByIdUseCase } from '../applications/useCases/deleteDriverById.useCase';
import { FilteredDriversUseCase } from '../applications/useCases/filteredDrivers.useCase';
import { FilteredDriversDto } from './dto/filteredDrivers.dto';

@Controller('driver')
export class DriverController {
  constructor(
    private readonly createDriveruseCase: CreateDriverUseCase,
    private readonly findAllDriversUseCase: FindAllDriversUseCase,
    private readonly findDriverByIdUseCase: FindDriverByIdUseCase,
    private readonly updateDriverByIdUserCase: UpdateDriverByIdUseCase,
    private readonly deleteDriverByIdUseCase: DeleteDriverByIdUseCase,
    private readonly filteredDriversUseCase: FilteredDriversUseCase,
  ) {}

  @Post()
  async createDriver(@Body() createDriverDto: CreateDriverDto) {
    return this.createDriveruseCase.execute(createDriverDto);
  }

  @Get()
  async findAllDrivers() {
    return this.findAllDriversUseCase.execute();
  }

  @Get('search')
  async findDriversByName(@Query() filteredDriversDto: FilteredDriversDto) {
    return this.filteredDriversUseCase.execute(filteredDriversDto);
  }

  @Get(':driverId')
  async findDriverById(@Param('driverId') driverId: string) {
    return this.findDriverByIdUseCase.execute(driverId);
  }

  @Patch(':driverId')
  async updateDriverById(
    @Param('driverId') driverId: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.updateDriverByIdUserCase.execute(driverId, updateDriverDto);
  }

  @Delete(':driverId')
  async removeDriverById(@Param('driverId') driverId: string) {
    return this.deleteDriverByIdUseCase.execute(driverId);
  }
}
