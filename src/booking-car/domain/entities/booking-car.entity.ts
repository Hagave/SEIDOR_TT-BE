import { CarEntity } from 'src/car/domain/entities/car.entity';
import { DriverEntity } from 'src/driver/domain/entities/driver.entity';

export class BookingCarEntity {
  constructor(
    private readonly id: string,
    private carId: string,
    private driverId: string,
    private reason: string,
    private bookedAt: Date,
    private deliveredAt: Date,
    private hasDelivery: boolean,
    private readonly car?: CarEntity, // entidade rica
    private readonly driver?: DriverEntity,
  ) {
    if (!this.id) throw new Error('Id is required');
    if (!this.carId) throw new Error('carId is required');
    if (!this.driverId) throw new Error('driverId is required');
    if (!this.reason) throw new Error('reason is required');
    if (!this.bookedAt) throw new Error('bookedAt is required');
    if (!this.deliveredAt) throw new Error('deliveredAt is required');
    if (typeof this.hasDelivery !== 'boolean')
      throw new Error('hasDelivery is required');
  }

  // -------- GETTERS --------//
  getId() {
    return this.id;
  }
  getCarId() {
    return this.carId;
  }
  getDriverId() {
    return this.driverId;
  }

  getreason() {
    return this.reason;
  }
  getBookedAt() {
    return this.bookedAt;
  }

  getDeliveredAt() {
    return this.deliveredAt;
  }

  gethasDelivery() {
    return this.hasDelivery;
  }

  getCar() {
    return this.car;
  }
  getDriver() {
    return this.driver;
  }

  // -------- DOMAIN BEHAVIOR --------//

  updateReson(newReason: string): void {
    if (newReason === this.reason)
      throw new Error('You can`t use the same reason');
    this.reason = newReason;
  }
  updateBookedAt(newDate: Date) {
    if (newDate === this.bookedAt)
      throw new Error('You can`t use the same booked data');
    this.bookedAt = newDate;
  }
  updateDeliveryAt(newDate: Date) {
    if (newDate === this.deliveredAt)
      throw new Error('You can`t use the same delivery data');
    this.deliveredAt = newDate;
  }

  updateHasDelivery(newDelivery: boolean): void {
    if (newDelivery === this.hasDelivery)
      throw new Error('The booking has already delivered');

    this.hasDelivery = newDelivery;
  }
}
