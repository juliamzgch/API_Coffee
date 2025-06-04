import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CoffeeService } from './coffees.service';
import { CreateCoffeeDto } from '../../dto/create-coffee.dto';

@Controller()
export class CoffeeController {
  constructor(private readonly appService: CoffeeService) {}

  //@Get('/coffees')
  //getCoffees() {
    //return this.appService.getCoffees();
  //}

  @Post('/coffee-create')
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.appService.createCoffee(createCoffeeDto);
  }

  @Get('/coffees/:id/detalhes')
  getCoffeeDetalhes(@Param('id') id: string) {
    return this.appService.getCoffeeDetalhes(id);
  }

  //pesquisa por data
  //usando query
  //query aumenta o url, mas não o endpoint
  @Get('/coffees')
  getCoffeesByDate(@Query('start') start: string, @Query('end') end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.appService.getCoffeePesquisaData(startDate, endDate);
  }

}
