import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

export interface Coffee {
  nome: string;
  tipo: string;
  id: string;
  quantidade?: number;
  preco?: number;
  descricao?: string;
  tags?: string[];
  start_date: Date;
  end_date: Date;
}

@Injectable()
export class AppService {

  private coffees: Coffee[] = [
    {
      nome: 'Paraíso',
      tipo: 'Forte',
      quantidade: 2,
      preco: 26.6,
      id: '22',
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: ['intenso', 'cacau', 'tradicional'],
      start_date: new Date('2025-12-01'),
      end_date: new Date('2025-12-02'),
    },
  ];

  getCoffees(): Coffee[] {
    return this.coffees;
  }

  createCoffee(coffeeDto: CreateCoffeeDto) {
    const existCoffee = this.coffees.find(
      (c) => c.nome === coffeeDto.nome || c.id === coffeeDto.id,
    );

    if (existCoffee) {
      throw new BadRequestException('Café já existe');
    }

    const newCoffee: Coffee = {
      ...coffeeDto,
      start_date: new Date(coffeeDto.start_date),
      end_date: new Date(coffeeDto.end_date),
    };

    this.coffees.push(newCoffee);

    return {
      message: 'Café criado com sucesso',
      cafe: newCoffee,
      };
    }

  getCoffeeDetalhes(id: string): Coffee | undefined {
    return this.coffees.find((coffee) => coffee.id === id);
  }

  getCoffeePesquisaData(start_date: Date, end_date: Date) {
    return this.coffees.filter((coffee) =>
      coffee.start_date <= end_date && coffee.end_date >= start_date
    );
  }

}
