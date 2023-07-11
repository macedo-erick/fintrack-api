import { Test, TestingModule } from '@nestjs/testing';
import { CardExpenseService } from './card-expense.service';

describe('CardExpenseService', () => {
  let service: CardExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardExpenseService],
    }).compile();

    service = module.get<CardExpenseService>(CardExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
