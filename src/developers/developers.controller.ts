import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  async create(@Body() data: CreateDeveloperDto) {
    return this.developersService.create(data);
  }

  @Get()
  async findAll() {
    return this.developersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.developersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDeveloperDto) {
    return this.developersService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.developersService.remove(id);
  }
}
