import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { EncryptService } from '../../../common/services/encrypt/encrypt.service';
import { CategoryService } from '../../category/services/category.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private encryptService: EncryptService,
    private categoryService: CategoryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (!user) {
      return new this.userModel({
        ...createUserDto,
        password: this.encryptService.encrypt(createUserDto.password),
      }).save();
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'User already exists for given email',
        timestamp: new Date().getTime(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id }, updateUserDto);
  }

  remove(_id: string) {
    return this.userModel.deleteOne({ _id });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
