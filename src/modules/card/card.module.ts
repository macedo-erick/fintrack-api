import { Module } from '@nestjs/common';
import { CardService } from './services/card.service';
import { CardController } from './contollers/card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './entities/card.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
