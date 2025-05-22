import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/coffees')
  getCoffees() {
    return this.appService.getCoffees();
  }

  @Post('/coffee-create')
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.appService.createCoffee(createCoffeeDto);
  }

  @Get('/coffees/:id/detalhes')
  getCoffeeDetalhes(@Param('id') id: string) {
    return this.appService.getCoffeeDetalhes(id);
  }
}
