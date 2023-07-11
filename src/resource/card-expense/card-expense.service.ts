import { Injectable } from '@nestjs/common';
import { CreateCardExpenseDto } from './dto/create-card-expense.dto';
import { UpdateCardExpenseDto } from './dto/update-card-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardExpense } from './entities/card-expense.entity';
import { FileService } from '../../shared/service/file/file.service';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class CardExpenseService {
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  constructor(
    @InjectModel(CardExpense.name) private cardExpenseModel: Model<CardExpense>,
    private fileService: FileService,
    private invoiceService: InvoiceService,
  ) {}

  async create(
    createCardExpenseDto: CreateCardExpenseDto,
    files: Array<Express.Multer.File>,
  ): Promise<CardExpense> {
    if (files) {
      createCardExpenseDto.attachments = await Promise.all(
        files
          .filter((f) => this.allowedTypes.includes(f.mimetype))
          .map(async (f) => {
            const { uploadedUrl } = await this.fileService.uploadFile(f);

            return uploadedUrl;
          }),
      );
    }

    const createdExpense = await new this.cardExpenseModel(
      createCardExpenseDto,
    ).save();

    const invoice = await this.invoiceService.findOne(createdExpense.invoice);
    invoice.value = invoice.value + createCardExpenseDto.value;

    await this.invoiceService.update(createdExpense.invoice, invoice);

    return createdExpense;
  }

  findAll(): Promise<CardExpense[]> {
    return this.cardExpenseModel.find();
  }

  findOne(id: string): Promise<CardExpense> {
    return this.cardExpenseModel.findById(id);
  }

  update(_id: string, updateCardExpenseDto: UpdateCardExpenseDto) {
    return this.cardExpenseModel.updateOne({ _id }, updateCardExpenseDto);
  }

  remove(_id: string) {
    return this.cardExpenseModel.deleteOne({ _id });
  }

  findAllByInvoice(invoice: string): Promise<CardExpense[]> {
    return this.cardExpenseModel.find({ invoice });
  }
}
