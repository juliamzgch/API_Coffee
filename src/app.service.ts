import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

export interface Coffee extends CreateCoffeeDto {}

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
    },
  ];

  getCoffees(): Coffee[] {
    return this.coffees;
  }

  createCoffee(coffee: CreateCoffeeDto): { message: string; cafe: Coffee } {
    const exists = this.coffees.find((c) => c.nome === coffee.nome || c.id === coffee.id);

    if (exists) {
      throw new BadRequestException('Café já existe');
    }

    this.coffees.push(coffee);
    return {
      message: 'Café criado com sucesso',
      cafe: coffee,
    };
  }

  getCoffeeDetalhes(id: string): Coffee | undefined {
    return this.coffees.find((coffee) => coffee.id === id);
  }
}
