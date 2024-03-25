import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { PrismaService } from '../database/prisma.service';
import { DevelopersRepository } from './repository/developers.repository';

@Module({
  controllers: [DevelopersController],
  providers: [DevelopersService, PrismaService, DevelopersRepository],
})
export class DevelopersModule {}
