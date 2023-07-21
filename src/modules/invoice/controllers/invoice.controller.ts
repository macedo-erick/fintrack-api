import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('invoices')
@ApiTags('Invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }

  @Get('/card/:cardId')
  findAllByCardId(@Param('cardId') cardId: string) {
    return this.invoiceService.findAllByCardId(cardId);
  }
}
