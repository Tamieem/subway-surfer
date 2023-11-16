"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = exports.md5 = void 0;
const common_1 = require("@nestjs/common");
const card_entity_1 = require("../../typeorm/entities/card.entity");
const typeorm_1 = require("typeorm");
const crypto = require("crypto");
const md5 = (contents) => crypto.createHash('md5').update(contents).digest('hex');
exports.md5 = md5;
let CardService = class CardService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.cardRepository = this.dataSource.getRepository(card_entity_1.Card);
    }
    async create(createCardDto) {
        let cardNumber = createCardDto.number;
        const card = await this.findOneByNumber(cardNumber);
        if (!card) {
            cardNumber = (0, exports.md5)(cardNumber);
            createCardDto.number = cardNumber;
            await this.cardRepository.save(createCardDto);
            return 'Card Successfully Created!';
        }
        card.balance = +card.balance + +createCardDto.balance;
        await this.cardRepository.save(card);
        return 'Card Balance Successfully updated';
    }
    async findAll() {
        return this.cardRepository.find();
    }
    async findOneById(id) {
        return this.cardRepository.findOneBy({ id: id });
    }
    async findOneByNumber(number) {
        const cardNumber = (0, exports.md5)(number);
        return this.cardRepository.findOneBy({ number: cardNumber });
    }
    async updateById(id, updateCardDto) {
        let card = await this.findOneById(id);
        card = { ...card, ...updateCardDto };
        return await this.cardRepository.save(card);
    }
    async updateByNumber(number, updateCardDto) {
        let card = await this.findOneByNumber(number);
        card = { ...card, ...updateCardDto };
        return await this.cardRepository.save(card);
    }
    async remove(id) {
        const card = await this.findOneById(id);
        return await this.cardRepository.softRemove(card);
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CardService);
//# sourceMappingURL=card.service.js.map