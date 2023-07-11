import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardExpenseType = HydratedDocument<Expense>;

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
  userId: string;

  @Prop()
  tags?: string[];

  @Prop()
  attachments?: string[];

  @Prop()
  installments?: number;

  @Prop()
  fixed?: boolean;

  @Prop()
  invoiceId?: string;
}

export const CardExpenseSchema = SchemaFactory.createForClass(Expense);
