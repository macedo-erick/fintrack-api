import { Module } from '@nestjs/common';
import { CardExpenseService } from './card-expense.service';
import { CardExpenseController } from './card-expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardExpense, CardExpenseSchema } from './entities/card-expense.entity';
import { FileService } from '../../shared/service/file/file.service';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice, InvoiceSchema } from '../invoice/entities/invoice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CardExpense.name, schema: CardExpenseSchema },
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
  ],
  controllers: [CardExpenseController],
  providers: [CardExpenseService, FileService, InvoiceService],
})
export class CardExpenseModule {}
