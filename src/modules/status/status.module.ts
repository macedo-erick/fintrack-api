import { Global, Module } from '@nestjs/common';
import { StatusService } from './services/status.service';
import { StatusController } from './controllers/status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './entities/status.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
