import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './entities/card.entity';
import { Model } from 'mongoose';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  create(createCardDto: CreateCardDto): Promise<Card> {
    return new this.cardModel(createCardDto).save();
  }

  findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  findAllByUser(user: string): Promise<Card[]> {
    return this.cardModel.find({ user }).exec();
  }

  findOne(id: string): Promise<Card> {
    return this.cardModel.findById(id);
  }

  update(_id: string, updateCardDto: UpdateCardDto) {
    return this.cardModel.updateOne({ _id }, updateCardDto);
  }

  remove(_id: string) {
    return this.cardModel.deleteOne({ _id });
  }
}
