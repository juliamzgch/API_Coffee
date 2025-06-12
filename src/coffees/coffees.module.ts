import { Module } from '@nestjs/common';
import { CoffeeService } from './coffees.service';
import { CoffeeController } from './coffees.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeesModule {}

