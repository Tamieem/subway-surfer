import { Card } from 'src/typeorm/entities/card.entity';
import { DataSource } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare const md5: (contents: string) => string;
export declare class CardService {
    private dataSource;
    constructor(dataSource: DataSource);
    private cardRepository;
    create(createCardDto: CreateCardDto): Promise<"Card Successfully Created!" | "Card Balance Successfully updated">;
    findAll(): Promise<Card[]>;
    findOneById(id: number): Promise<Card>;
    findOneByNumber(number: string): Promise<Card>;
    updateById(id: number, updateCardDto: UpdateCardDto): Promise<Card>;
    updateByNumber(number: string, updateCardDto: UpdateCardDto): Promise<Card>;
    remove(id: number): Promise<Card>;
}
