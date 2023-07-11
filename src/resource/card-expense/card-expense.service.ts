import { Injectable } from '@nestjs/common';
import { CreateCardExpenseDto } from './dto/create-card-expense.dto';
import { UpdateCardExpenseDto } from './dto/update-card-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardExpense } from './entities/card-expense.entity';

@Injectable()
export class CardExpenseService {
  constructor(
    @InjectModel(CardExpense.name) private cardExpenseModel: Model<CardExpense>,
  ) {}

  create(createCardExpenseDto: CreateCardExpenseDto): Promise<CardExpense> {
    return new this.cardExpenseModel(createCardExpenseDto).save();
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
}
