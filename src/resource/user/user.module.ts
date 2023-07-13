import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { EncryptService } from '../../shared/service/encrypt/encrypt.service';
import { CategoryService } from '../category/category.service';
import { Category, CategorySchema } from '../category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [],
  providers: [UserService, EncryptService, CategoryService],
})
export class UserModule {}
