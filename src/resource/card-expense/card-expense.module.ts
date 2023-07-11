import { Module } from '@nestjs/common';
import { CardExpenseService } from './card-expense.service';
import { CardExpenseController } from './card-expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardExpense, CardExpenseSchema } from './entities/card-expense.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CardExpense.name, schema: CardExpenseSchema },
    ]),
  ],
  controllers: [CardExpenseController],
  providers: [CardExpenseService],
})
export class CardExpenseModule {}
