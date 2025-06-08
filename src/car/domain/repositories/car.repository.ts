import { CarEntity } from '../entities/car.entity';

export abstract class CarRepository {
  abstract createCar(carEntity: CarEntity): Promise<CarEntity>;
  abstract findCarById(id?: string, plate?: string): Promise<CarEntity | null>;
  abstract findAllCars(): Promise<CarEntity[]>;
  abstract updateCar(updateCar: CarEntity): Promise<CarEntity>;
  abstract deleteCarByPlate(plate: string): Promise<void>;
  abstract filteredCarsByColorOrBrand(
    color?: string,
    brand?: string,
  ): Promise<CarEntity[]>;
}
