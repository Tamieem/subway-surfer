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
exports.Ride = void 0;
const typeorm_1 = require("typeorm");
const card_entity_1 = require("./card.entity");
const station_entity_1 = require("./station.entity");
let Ride = class Ride {
};
exports.Ride = Ride;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ride.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, (card) => card.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", card_entity_1.Card)
], Ride.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", station_entity_1.Station)
], Ride.prototype, "enteredStation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", station_entity_1.Station)
], Ride.prototype, "exitedStation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Ride.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ride.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Ride.prototype, "endedAt", void 0);
exports.Ride = Ride = __decorate([
    (0, typeorm_1.Entity)()
], Ride);
//# sourceMappingURL=ride.entity.js.map