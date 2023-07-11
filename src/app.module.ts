import { Module } from '@nestjs/common';
import { CardModule } from './resource/card/card.module';
import { InvoiceModule } from './resource/invoice/invoice.module';
import { ExpenseModule } from './resource/expense/expense.module';
import { TagModule } from './resource/tag/tag.module';
import { UserModule } from './resource/user/user.module';
import { CategoryModule } from './resource/category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';
import { EncryptService } from './shared/service/encrypt/encrypt.service';
import { StatusModule } from './resource/status/status.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ExpenseModule,
    InvoiceModule,
    CardModule,
    TagModule,
    UserModule,
    CategoryModule,
    StatusModule,
  ],
  controllers: [],
  providers: [EncryptService, EncryptService],
})
export class AppModule {}
