// booking-car.response.dto.ts

export class BookingCarResponseDto {
  id: string;
  reason: string;
  bookedAt: Date;
  deliveredAt: Date;
  hasDelivery: boolean;
  car: {
    id: string;
    plate: string;
    brand: string;
    color: string;
    isReserved: boolean;
  };
  driver: {
    id: string;
    name: string;
    licenseNumber: string;
    isDriving: boolean;
  };
}
