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
exports.TrainStationsStation = void 0;
const typeorm_1 = require("typeorm");
const train_entity_1 = require("./train.entity");
const station_entity_1 = require("./station.entity");
let TrainStationsStation = class TrainStationsStation {
};
exports.TrainStationsStation = TrainStationsStation;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TrainStationsStation.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TrainStationsStation.prototype, "trainId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => train_entity_1.Train, (train) => train.stations),
    __metadata("design:type", train_entity_1.Train)
], TrainStationsStation.prototype, "train", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.trains),
    __metadata("design:type", station_entity_1.Station)
], TrainStationsStation.prototype, "station", void 0);
exports.TrainStationsStation = TrainStationsStation = __decorate([
    (0, typeorm_1.Entity)('train_stations_station')
], TrainStationsStation);
//# sourceMappingURL=train-station.entity.js.map