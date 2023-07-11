import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop()
  description: string;

  @Prop()
  value: number;

  @Prop()
  date: Date;

  @Prop()
  category: string;

  @Prop()
  tags: string[];

  @Prop()
  attachments?: string[];

  @Prop()
  fixed: boolean;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
