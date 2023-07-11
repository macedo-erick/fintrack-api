import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('expenses')
@ApiTags('Expense')
export class ExpenseController {
  constructor(private readonly cardExpenseService: ExpenseService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachments'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createCardExpenseDto: CreateExpenseDto,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ) {
    return this.cardExpenseService.create(createCardExpenseDto, attachments);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardExpenseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardExpenseDto: UpdateExpenseDto,
  ) {
    return this.cardExpenseService.update(id, updateCardExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardExpenseService.remove(id);
  }

  @Get('/invoice/:invoiceId')
  findAllByInvoiceId(@Param('invoiceId') invoiceId: string) {
    return this.cardExpenseService.findAllByInvoiceId(invoiceId);
  }

  @Get('')
  findAllByPeriod(@Query('month') month: number, @Query('year') year: number) {
    return this.cardExpenseService.findAllByPeriod(month, year);
  }
}
