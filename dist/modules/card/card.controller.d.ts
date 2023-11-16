import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    create(createCardDto: CreateCardDto): Promise<"Card Successfully Created!" | "Card Balance Successfully updated"> | "You cannot introduce negative balance to a card";
    findAll(): Promise<import("../../typeorm/entities/card.entity").Card[]>;
    findOne(id: number): Promise<import("../../typeorm/entities/card.entity").Card>;
    update(id: number, updateCardDto: UpdateCardDto): Promise<import("../../typeorm/entities/card.entity").Card>;
    remove(id: number): Promise<import("../../typeorm/entities/card.entity").Card>;
    findOneByNumber(number: string): Promise<import("../../typeorm/entities/card.entity").Card>;
    updateByNumber(number: string, updateCardDto: UpdateCardDto): Promise<import("../../typeorm/entities/card.entity").Card>;
    removeByNumber(number: string): Promise<import("../../typeorm/entities/card.entity").Card>;
}
