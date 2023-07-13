import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { EncryptService } from '../../shared/service/encrypt/encrypt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { Category, CategorySchema } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';

import { config } from 'dotenv';

config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, EncryptService, CategoryService],
})
export class AuthModule {}
