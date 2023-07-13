import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { EncryptService } from '../../shared/service/encrypt/encrypt.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private encryptService: EncryptService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.userService.findByEmail(authDto.email);

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not exists for given email',
          timestamp: new Date().getTime(),
        },
        HttpStatus.NOT_FOUND,
      );

    if (!this.encryptService.compare(authDto.password, user.password))
      throw new UnauthorizedException({
        error: 'Password mismatch',
        timestamp: new Date().getTime(),
      });

    const payload = { id: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  signOff(id: number) {
    return `This action removes a #${id} auth`;
  }
}
