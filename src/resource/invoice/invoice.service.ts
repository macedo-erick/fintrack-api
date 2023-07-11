import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './entities/invoice.entity';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}

  create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return new this.invoiceModel(createInvoiceDto).save();
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find();
  }

  findOne(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id);
  }

  update(_id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceModel.updateOne({ _id }, updateInvoiceDto);
  }

  remove(_id: string) {
    return this.invoiceModel.deleteOne({ _id });
  }

  findAllByCardId(cardId: string): Promise<Invoice[]> {
    return this.invoiceModel.find({ card: cardId });
  }
}
