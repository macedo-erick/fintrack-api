import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { ExpenseModule } from './modules/expense/expense.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { TagModule } from './modules/tag/tag.module';
import { CardModule } from './modules/card/card.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { StatusModule } from './modules/status/status.module';
import { AuthModule } from './modules/auth/auth.module';
import { EncryptModule } from './common/modules/encrypt.module';
import { AttachmentModule } from './common/modules/attachment.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES) },
    }),
    ExpenseModule,
    InvoiceModule,
    CardModule,
    TagModule,
    UserModule,
    CategoryModule,
    StatusModule,
    AuthModule,
    EncryptModule,
    AttachmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
