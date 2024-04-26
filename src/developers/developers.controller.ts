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
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiNotFoundResponse({
  description: 'Not found - Registro não encontrado.',
})
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error.',
})
@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiQuery({ name: 'search', description: 'Busca', required: false })
  @ApiQuery({
    name: 'order',
    description: 'Crescente/decrescente - asc ou desc',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    description: 'Ordenador - "id ou name"',
    required: false,
  })
  @ApiQuery({
    name: 'size',
    description: 'Tamanho do retorno',
    required: false,
  })
  @ApiQuery({ name: 'page', description: 'Página', required: false })
  @ApiOperation({ summary: 'Paginação' })
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

  @ApiResponse({
    status: 201,
    description: 'Success.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  @ApiOperation({ summary: 'Cria cadastro' })
  async create(@Body() data: CreateDeveloperDto) {
    return this.developersService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get()
  @ApiOperation({ summary: 'Listagem' })
  async findAll() {
    return this.developersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Busca pelo Id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.developersService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Atualização' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDeveloperDto) {
    return this.developersService.update(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Remove cadastro' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.developersService.remove(id);
  }
}
