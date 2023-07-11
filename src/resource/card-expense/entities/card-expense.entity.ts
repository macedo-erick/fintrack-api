import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardExpenseType = HydratedDocument<CardExpense>;

@Schema()
export class CardExpense {
  @Prop()
  description: string;

  @Prop()
  value: string;

  @Prop()
  date: Date;

  @Prop()
  category: string;

  @Prop()
  tags: string[];

  @Prop()
  attachment: string;

  @Prop()
  installments: string;

  @Prop()
  invoice: string;
}

export const CardExpenseSchema = SchemaFactory.createForClass(CardExpense);
