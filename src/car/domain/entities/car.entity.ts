import { ConflictException } from '@nestjs/common';

export class CarEntity {
  constructor(
    private id: string,
    private plate: string,
    private color: string,
    private brand: string,
    private isReserved: boolean,
  ) {
    if (!this.id) throw new Error('Id is required');
    if (!this.plate) throw new Error('plate is required');
    if (!this.color) throw new Error('color is required');
    if (!this.brand) throw new Error('brand is required');
    if (typeof this.isReserved !== 'boolean')
      throw new Error('isReserved is required');
  }

  // -------- GETTERS --------//
  getId(): string {
    return this.id;
  }
  getPlate(): string {
    return this.plate;
  }
  getColor(): string {
    return this.color;
  }
  getBrand(): string {
    return this.brand;
  }
  getIsReserved(): boolean {
    return this.isReserved;
  }

  // -------- DOMAIN BEHAVIOR --------//

  updateReserve(newReserved: boolean): void {
    if (newReserved && this.isReserved) {
      throw new ConflictException('Car is already reserved');
    }

    this.isReserved = newReserved;
  }

  updateColor(newColor: string): void {
    if (!newColor) throw new Error('New color is required');
    this.color = newColor;
  }

  updatePlate(newPlate: string): void {
    if (!newPlate) throw new Error('New plate is required');
    this.plate = newPlate;
  }

  updateBrand(newBrand: string): void {
    if (!newBrand) throw new Error('New brand is required');
    this.brand = newBrand;
  }
}
