import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    if (createCardDto.balance < 0) {
      return 'You cannot introduce negative balance to a card';
    }
    return this.cardService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.cardService.findOneById(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.updateById(id, updateCardDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: number) {
    return this.cardService.remove(id);
  }

  @Get('/number/:number')
  findOneByNumber(@Param('number') number: string) {
    return this.cardService.findOneByNumber(number);
  }

  @Patch('/number/:number')
  updateByNumber(
    @Param('number') number: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.updateByNumber(number, updateCardDto);
  }

  @Delete('/number/:number')
  removeByNumber(@Param('number') number: string) {
    return this.cardService.remove(+number);
  }
}
