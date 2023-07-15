import { Global, Module } from '@nestjs/common';
import { EncryptService } from '../services/encrypt/encrypt.service';

@Global()
@Module({
  providers: [EncryptService],
  exports: [EncryptService],
})
export class EncryptModule {}
