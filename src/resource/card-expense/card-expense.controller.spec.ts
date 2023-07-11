import { Test, TestingModule } from '@nestjs/testing';
import { CardExpenseController } from './card-expense.controller';
import { CardExpenseService } from './card-expense.service';

describe('CardExpenseController', () => {
  let controller: CardExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardExpenseController],
      providers: [CardExpenseService],
    }).compile();

    controller = module.get<CardExpenseController>(CardExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
