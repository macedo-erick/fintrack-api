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
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private encryptService: EncryptService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto, res: Response) {
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

    const jwt = await this.jwtService.signAsync(payload);

    res.cookie('SESSION_ID', jwt);

    return res.status(200).send({
      access_token: jwt,
      expires_in: parseInt(process.env.JWT_EXPIRES),
      token_type: 'Bearer',
    });
  }

  signOut(res: Response) {
    res.cookie('SESSION_ID', null);

    return res.status(200).send({ message: 'User signed out successfully' });
  }
}
