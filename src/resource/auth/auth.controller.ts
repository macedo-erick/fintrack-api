import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/decorator/public/public.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  signIn(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.signIn(authDto, res);
  }

  @Post('signout')
  signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
