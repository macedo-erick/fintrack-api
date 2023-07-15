import { Global, Module } from '@nestjs/common';
import { AttachmentService } from '../services/attachment/attachment.service';

@Global()
@Module({
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
