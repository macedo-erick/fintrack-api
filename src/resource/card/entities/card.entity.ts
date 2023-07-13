import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop()
  description: string;

  @Prop()
  closeDate: number;

  @Prop()
  dueDate: number;

  @Prop()
  userId?: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
