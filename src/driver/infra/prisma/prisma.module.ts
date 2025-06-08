import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaDriverRepository } from './prisma.repository';

@Module({
  providers: [PrismaService, PrismaDriverRepository],
  exports: [PrismaService],
})
export class PrismaModule {}
