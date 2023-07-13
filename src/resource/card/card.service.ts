/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './entities/card.entity';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  create(createCardDto: Card): Promise<Card> {
    return new this.cardModel(createCardDto).save();
  }

  findAll(userId: string): Promise<CreateCardDto[]> {
    return this.cardModel
      .find({ userId })
      .lean()
      .then((cards) => cards.map(({ userId, ...card }) => card));
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
