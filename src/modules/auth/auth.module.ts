import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

config();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
