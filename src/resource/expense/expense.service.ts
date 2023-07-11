import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return new this.expenseModel(createExpenseDto).save();
  }

  findAll(): Promise<Expense[]> {
    return this.expenseModel.find();
  }

  findOne(id: string): Promise<Expense> {
    return this.expenseModel.findById(id);
  }

  update(_id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.expenseModel.updateOne({ _id }, updateExpenseDto);
  }

  remove(_id: string) {
    return this.expenseModel.deleteOne({ _id });
  }

  findAllByMonthAndYear(month: number, year: number): Promise<Expense[]> {
    return this.expenseModel
      .find({
        date: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      })
      .exec();
  }
}
