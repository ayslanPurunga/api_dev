import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class DevelopersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDeveloperDto) {
    return this.prisma.developer.create({
      data,
    });
  }

  async findAll() {}

  async findOne(id: string) {
    await this.exists(id);

    return this.prisma.developer.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateDeveloperDto) {
    await this.exists(id);

    return await this.prisma.developer.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.exists(id);

    return this.prisma.developer.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prisma.developer.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
