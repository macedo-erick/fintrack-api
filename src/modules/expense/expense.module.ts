import { Global, Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardExpenseSchema, Expense } from './entities/expense.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.name, schema: CardExpenseSchema },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
