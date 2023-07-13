import { Module } from '@nestjs/common';
import { CardModule } from './resource/card/card.module';
import { InvoiceModule } from './resource/invoice/invoice.module';
import { ExpenseModule } from './resource/expense/expense.module';
import { TagModule } from './resource/tag/tag.module';
import { UserModule } from './resource/user/user.module';
import { CategoryModule } from './resource/category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';
import { StatusModule } from './resource/status/status.module';
import { AuthModule } from './resource/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
