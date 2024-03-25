import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Request,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.developersService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

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
