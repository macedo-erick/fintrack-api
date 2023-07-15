import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public/public.decorator';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { UserService } from '../../user/services/user.service';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth.dto';

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
