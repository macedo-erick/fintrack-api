import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop()
  cardId: string;

  @Prop()
  value: number;

  @Prop()
  closeDate: Date;

  @Prop()
  dueDate: Date;

  @Prop()
  status: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
