export class CarEntity {
  constructor(
    private readonly id: string,
    private plate: string,
    private color: string,
    private brand: string,
    private isReserved: boolean,
  ) {
    if (!id) throw new Error('Id is required');
    if (!plate) throw new Error('Plate is required');
    if (!color) throw new Error('Color is required');
    if (!brand) throw new Error('Brand is required');
    if (typeof isReserved !== 'boolean')
      throw new Error('isReserved is required');
  }

  // Getters
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

  // Domain behavior
  updateReserve(newReserved: boolean): void {
    if (newReserved && this.isReserved) {
      throw new Error('Car is already reserved');
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
