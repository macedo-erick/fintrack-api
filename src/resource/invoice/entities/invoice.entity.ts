import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop()
  card: string;

  @Prop()
  value: number;

  @Prop()
  closeDate: Date;

  @Prop()
  dueDate: Date;

  @Prop()
  status: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
