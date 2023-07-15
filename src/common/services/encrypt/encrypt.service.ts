import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  encrypt(str: string) {
    return bcrypt.hashSync(str, parseInt(process.env.SALT_ROUNDS));
  }

  compare(str: string, hash: string) {
    return bcrypt.compareSync(str, hash);
  }
}
