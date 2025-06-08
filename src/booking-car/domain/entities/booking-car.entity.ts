import { ConflictException } from '@nestjs/common';

export class BookingCarEntity {
  constructor(
    private id: string,
    private carId: string,
    private driverId: string,
    private reason: string,
    private bookedAt: Date,
    private deliveredAt: Date,
  ) {
    if (!this.id) throw new Error('Id is required');
    if (!this.carId) throw new Error('carId is required');
    if (!this.driverId) throw new Error('driverId is required');
    if (!this.reason) throw new Error('reason is required');
    if (!this.bookedAt) throw new Error('bookedAt is required');
    if (!this.deliveredAt) throw new Error('deliveredAt is required');
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

  // -------- DOMAIN BEHAVIOR --------//

  updateReson(newReason: string): void {
    if (newReason === this.reason)
      throw new ConflictException('You can`t use the same reason');
    this.reason = newReason;
  }
  updateBookedAt(newDate: Date) {
    if (newDate === this.bookedAt)
      throw new ConflictException('You can`t use the same data');
  }
  updateDeliveryAt(newDate: Date) {
    if (newDate === this.deliveredAt)
      throw new ConflictException('You can`t use the same data');
  }
}
