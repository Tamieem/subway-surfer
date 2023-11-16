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
exports.Train = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
let Train = class Train {
};
exports.Train = Train;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Train.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Train.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 12.5 }),
    __metadata("design:type", Number)
], Train.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => station_entity_1.Station, (station) => station.trains),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Train.prototype, "stations", void 0);
exports.Train = Train = __decorate([
    (0, typeorm_1.Entity)()
], Train);
//# sourceMappingURL=train.entity.js.map