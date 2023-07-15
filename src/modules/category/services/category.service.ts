import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return new this.categoryModel(createCategoryDto).save();
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.updateOne({ _id }, updateCategoryDto);
  }

  remove(_id: string) {
    return this.categoryModel.deleteOne({ _id });
  }
}
