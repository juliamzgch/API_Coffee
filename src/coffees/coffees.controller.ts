import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CoffeeService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post('coffee-create')
  async create(@Body() createCafeDto: CreateCoffeeDto) {
    try {
      return await this.coffeeService.create(createCafeDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.coffeeService.findAll();
  }

  @Get(':id/order')
  async findPedidosByCafeId(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.findPedidosByCafeId(id);
  }

  @Get('plus-order-coffee')
  async findMaisVendidos(
    @Query('tipo') tipo?: string,
    @Query('nome') nome?: string,
  ) {
    return this.coffeeService.findMaisVendidos(tipo, nome);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.remove(id);
  }
}
