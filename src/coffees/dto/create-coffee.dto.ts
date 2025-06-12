import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

