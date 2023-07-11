import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CardExpenseService } from './card-expense.service';
import { CreateCardExpenseDto } from './dto/create-card-expense.dto';
import { UpdateCardExpenseDto } from './dto/update-card-expense.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('card-expenses')
@ApiTags('Card Expense')
export class CardExpenseController {
  constructor(private readonly cardExpenseService: CardExpenseService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachments'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createCardExpenseDto: CreateCardExpenseDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.cardExpenseService.create(createCardExpenseDto, files);
  }

  @Get()
  findAll() {
    return this.cardExpenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardExpenseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardExpenseDto: UpdateCardExpenseDto,
  ) {
    return this.cardExpenseService.update(id, updateCardExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardExpenseService.remove(id);
  }

  @Get('/invoice/:invoiceId')
  findAllByInvoice(@Param('invoiceId') invoiceId: string) {
    return this.cardExpenseService.findAllByInvoice(invoiceId);
  }
}
