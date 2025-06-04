import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeController } from './coffees.controller';
import { CoffeeService } from './coffees.service';

describe('AppController', () => {
  let appController: CoffeeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeController],
      providers: [CoffeeService],
    }).compile();

    appController = app.get<CoffeeController>(CoffeeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
