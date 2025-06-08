import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CreateBookingCarUseCase } from '../applications/useCases/createBookingCar.useCase';
import { DeliveryBookingCarUseCase } from '../applications/useCases/deliveryBookingCar.useCase';
import { FindBookingCarByIdUseCase } from '../applications/useCases/findBookingCarById.useCase';
import { FindAllBookingsCarsUseCase } from '../applications/useCases/findAllBookingsCars.useCase';
import { CreateBookingCarDto } from './dto/create-booking-car.dto';
import { UpdateBookingCarDto } from './dto/update-booking-car.dto';

@Controller('booking-car')
export class BookingCarController {
  constructor(
    private readonly createBookingCarUseCase: CreateBookingCarUseCase,
    private readonly deliveryBookingCarUseCase: DeliveryBookingCarUseCase,
    private readonly findBookingCarByIdUseCase: FindBookingCarByIdUseCase,
    private readonly findAllBookingsCarsUseCase: FindAllBookingsCarsUseCase,
  ) {}

  @Post()
  create(@Body() createBookingCarDto: CreateBookingCarDto) {
    return this.createBookingCarUseCase.execute(createBookingCarDto);
  }

  @Get()
  findAll() {
    return this.findAllBookingsCarsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findBookingCarByIdUseCase.execute(id);
  }

  @Patch('delivery/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookingCarDto: UpdateBookingCarDto,
  ) {
    return this.deliveryBookingCarUseCase.execute(id, updateBookingCarDto);
  }
}
