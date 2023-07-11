import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardExpenseService } from './card-expense.service';
import { CreateCardExpenseDto } from './dto/create-card-expense.dto';
import { UpdateCardExpenseDto } from './dto/update-card-expense.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('card-expense')
@ApiTags('Card Expense')
export class CardExpenseController {
  constructor(private readonly cardExpenseService: CardExpenseService) {}

  @Post()
  create(@Body() createCardExpenseDto: CreateCardExpenseDto) {
    return this.cardExpenseService.create(createCardExpenseDto);
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
}
