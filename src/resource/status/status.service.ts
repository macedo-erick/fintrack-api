import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Status } from './entities/status.entity';
import { Model } from 'mongoose';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}

  create(createStatusDto: CreateStatusDto): Promise<Status> {
    return new this.statusModel(createStatusDto).save();
  }

  findAll(): Promise<Status[]> {
    return this.statusModel.find();
  }

  findOne(id: string): Promise<Status> {
    return this.statusModel.findById(id);
  }

  update(_id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusModel.updateOne({ _id }, updateStatusDto);
  }

  remove(_id: string) {
    return this.statusModel.deleteOne({ _id });
  }
}
