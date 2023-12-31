import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../entities/tag.entity';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  create(createTagDto: CreateTagDto): Promise<Tag> {
    return new this.tagModel(createTagDto).save();
  }

  findAll(userId: string): Promise<Tag[]> {
    return this.tagModel.find({ userId });
  }

  findOne(id: number): Promise<Tag> {
    return this.tagModel.findById(id);
  }

  update(_id: number, updateTagDto: UpdateTagDto) {
    return this.tagModel.updateOne({ _id }, updateTagDto);
  }

  remove(_id: number) {
    return this.tagModel.deleteOne({ _id });
  }
}
