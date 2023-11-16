import { Injectable } from '@nestjs/common';
import { Card } from 'src/typeorm/entities/card.entity';
import { DataSource } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import * as crypto from 'crypto';

export const md5 = (contents: string) =>
  crypto.createHash('md5').update(contents).digest('hex');

@Injectable()
export class CardService {
  constructor(private dataSource: DataSource) {}
  private cardRepository = this.dataSource.getRepository(Card);

  async create(createCardDto: CreateCardDto) {
    let cardNumber = createCardDto.number;
    const card = await this.findOneByNumber(cardNumber);
    if (!card) {
      cardNumber = md5(cardNumber);
      createCardDto.number = cardNumber;
      await this.cardRepository.save(createCardDto);
      return 'Card Successfully Created!';
    }
    card.balance = +card.balance + +createCardDto.balance;
    await this.cardRepository.save(card);
    return 'Card Balance Successfully updated';
  }

  async findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async findOneById(id: number) {
    return this.cardRepository.findOneBy({ id: id });
  }

  async findOneByNumber(number: string) {
    const cardNumber = md5(number);
    return this.cardRepository.findOneBy({ number: cardNumber });
  }
  async updateById(id: number, updateCardDto: UpdateCardDto) {
    let card = await this.findOneById(id);
    card = { ...card, ...updateCardDto };
    return await this.cardRepository.save(card);
  }

  async updateByNumber(number: string, updateCardDto: UpdateCardDto) {
    let card = await this.findOneByNumber(number);
    card = { ...card, ...updateCardDto };
    return await this.cardRepository.save(card);
  }

  async remove(id: number) {
    const card = await this.findOneById(id);
    return await this.cardRepository.softRemove(card);
  }
}
