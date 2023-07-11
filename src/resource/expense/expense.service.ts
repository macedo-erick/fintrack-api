import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './entities/expense.entity';
import { AttachmentService } from '../../shared/service/attachment/attachment.service';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class ExpenseService {
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    private attachmentService: AttachmentService,
    private invoiceService: InvoiceService,
  ) {}

  async create(
    createCardExpenseDto: CreateExpenseDto,
    files: Array<Express.Multer.File>,
  ): Promise<Expense> {
    if (files) {
      createCardExpenseDto.attachments = await Promise.all(
        files
          .filter((f) => this.allowedTypes.includes(f.mimetype))
          .map(async (f) => {
            const { uploadedUrl } = await this.attachmentService.uploadFile(f);

            return uploadedUrl;
          }),
      );
    }

    const createdExpense = await new this.expenseModel(
      createCardExpenseDto,
    ).save();

    const invoice = await this.invoiceService.findOne(createdExpense.invoiceId);
    invoice.value = invoice.value + createCardExpenseDto.value;

    await this.invoiceService.update(createdExpense.invoiceId, invoice);

    return createdExpense;
  }

  findAll(): Promise<Expense[]> {
    return this.expenseModel.find();
  }

  findOne(id: string): Promise<Expense> {
    return this.expenseModel.findById(id);
  }

  update(_id: string, updateCardExpenseDto: UpdateExpenseDto) {
    return this.expenseModel.updateOne({ _id }, updateCardExpenseDto);
  }

  remove(_id: string) {
    return this.expenseModel.deleteOne({ _id });
  }

  findAllByInvoiceId(invoiceId: string): Promise<Expense[]> {
    return this.expenseModel.find({ invoice: invoiceId });
  }

  findAllByPeriod(month: number, year: number): Promise<Expense[]> {
    return this.expenseModel
      .find({
        date: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      })
      .exec();
  }
}
