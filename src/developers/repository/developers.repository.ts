import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { PrismaService } from '../../database/prisma.service';
import { Gender } from '../../enum/gender.enum';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';

@Injectable()
export class DevelopersRepository {
  constructor(private prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.developer.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search, mode: 'insensitive' } },
      orderBy: { [sort]: order },
    });
    const totalItems = await this.prisma.developer.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });
    return { results, totalItems };
  }

  async create(data: CreateDeveloperDto) {
    const genderUpperCase = data.gender.toUpperCase();

    if (!Object.values(Gender).includes(genderUpperCase as Gender)) {
      throw new BadRequestException('Valor inválido para o campo gender.');
    }

    data.gender = genderUpperCase as Gender;

    return this.prisma.developer.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.developer.findMany();
  }

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
