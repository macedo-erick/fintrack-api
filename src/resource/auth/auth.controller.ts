import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/decorator/public/public.decorator';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Delete(':id')
  signOff(@Param('id') id: string) {
    return this.authService.signOff(+id);
  }
}
