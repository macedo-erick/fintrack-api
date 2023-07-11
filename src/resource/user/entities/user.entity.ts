import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
