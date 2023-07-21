import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../common/decorators/user/user.decorator';

@Controller('tags')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@User() userId: string, @Body() createTagDto: CreateTagDto) {
    return this.tagService.create({ ...createTagDto, userId });
  }

  @Get()
  findAll(@User() userId: string) {
    return this.tagService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
