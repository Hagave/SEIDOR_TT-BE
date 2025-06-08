import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaBookingRepository } from './prisma.repository';

@Module({
  providers: [PrismaService, PrismaBookingRepository],
  exports: [PrismaService],
})
export class PrismaModule {}
