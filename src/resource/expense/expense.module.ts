import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardExpenseSchema, Expense } from './entities/expense.entity';
import { AttachmentService } from '../../shared/service/attachment/attachment.service';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice, InvoiceSchema } from '../invoice/entities/invoice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.name, schema: CardExpenseSchema },
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, AttachmentService, InvoiceService],
})
export class ExpenseModule {}
