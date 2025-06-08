import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaCarRepository } from './prisma.repository';

@Module({
  providers: [PrismaService, PrismaCarRepository],
  exports: [PrismaService],
})
export class PrismaModule {}
