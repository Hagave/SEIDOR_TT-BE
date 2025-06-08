import { Injectable } from '@nestjs/common';
import { CarEntity } from 'src/car/domain/entities/car.entity';
import { CarRepository } from 'src/car/domain/repositories/car.repository';
import { PrismaService } from './prisma.service';
import { CarMapper } from 'src/car/application/mapper/car.mapper';

@Injectable()
export class PrismaCarRepository implements CarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCar(carEntity: CarEntity): Promise<CarEntity> {
    const createNewCar = await this.prisma.car.create({
      data: {
        id: carEntity.getId(),
        plate: carEntity.getPlate(),
        color: carEntity.getColor(),
        brand: carEntity.getBrand(),
      },
    });

    return CarMapper.toEntity(createNewCar);
  }
  async deleteCarByPlate(plate: string): Promise<void> {
    await this.prisma.car.delete({
      where: { plate },
    });
  }

  async findAllCars(): Promise<CarEntity[]> {
    const foundAllCars = await this.prisma.car.findMany();

    return foundAllCars.map((cars) => CarMapper.toEntity(cars));
  }

  async findCarById(id: string): Promise<CarEntity | null> {
    const foundCar = await this.prisma.car.findFirst({
      where: {
        OR: [{ id }, { plate: id }],
      },
      include: { bookings: true },
    });

    return foundCar ? CarMapper.toEntity(foundCar) : null;
  }

  async updateCar(updateCar: CarEntity): Promise<CarEntity> {
    const updatedCar = await this.prisma.car.update({
      where: { id: updateCar.getId() },
      data: {
        plate: updateCar?.getPlate(),
        color: updateCar?.getColor(),
        brand: updateCar?.getBrand(),
        isReserved: updateCar?.getIsReserved(),
      },
    });

    return CarMapper.toEntity(updatedCar);
  }
  async filteredCarsByColorOrBrand(
    color?: string,
    brand?: string,
  ): Promise<CarEntity[]> {
    const filteredCars = await this.prisma.car.findMany({
      where: {
        AND: [{ color }, { brand }],
      },
    });
    return filteredCars.map((car) => CarMapper.toEntity(car));
  }
}
