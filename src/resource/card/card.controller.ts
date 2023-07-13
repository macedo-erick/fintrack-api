import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../shared/decorator/user/user.decorator';

@Controller('cards')
@ApiTags('Card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@User() userId: string, @Body() createCardDto: CreateCardDto) {
    return this.cardService.create({ ...createCardDto, userId });
  }

  @Get()
  findAll(@User() userId: string): Promise<CreateCardDto[]> {
    return this.cardService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}
