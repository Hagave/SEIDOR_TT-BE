import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DriverRepository } from 'src/driver/domain/repositories/driver.repository';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';
import { DriverMapper } from 'src/driver/applications/mapper/driver.mapper';

@Injectable()
export class PrismaDriverRepository implements DriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDriver(driverEntity: DriverEntity): Promise<DriverEntity> {
    const newDriver = await this.prisma.driver.create({
      data: {
        id: driverEntity.getId(),
        name: driverEntity.getName(),
        isDriving: driverEntity.getIsDriving(),
      },
    });

    return DriverMapper.toEntity(newDriver);
  }

  async findAllDriver(): Promise<DriverEntity[]> {
    const allDrivers = await this.prisma.driver.findMany();

    return allDrivers.map((drivers) => DriverMapper.toEntity(drivers));
  }

  async findDriverById(driverId: string): Promise<DriverEntity | null> {
    const foundDriver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    return foundDriver ? DriverMapper.toEntity(foundDriver) : null;
  }

  async filteredDriversByName(name: string): Promise<DriverEntity[]> {
    const filteredName = await this.prisma.driver.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
    });

    return filteredName.map((filteredNames) =>
      DriverMapper.toEntity(filteredNames),
    );
  }
  async updateDriver(
    driverId: string,
    driverEntity: DriverEntity,
  ): Promise<DriverEntity> {
    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        name: driverEntity.getName(),
        isDriving: driverEntity.getIsDriving(),
      },
    });

    return DriverMapper.toEntity(updatedDriver);
  }

  async deleteDriverById(driverId: string): Promise<void> {
    await this.prisma.driver.delete({
      where: { id: driverId },
    });
  }
}
