"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trains_module_1 = require("./modules/trains/trains.module");
const station_module_1 = require("./modules/station/station.module");
const card_module_1 = require("./modules/card/card.module");
const ride_module_1 = require("./modules/ride/ride.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'alpine',
                database: 'postgres',
                entities: [`${__dirname}/typeorm/entities/*{.js,.ts}`],
                synchronize: true,
            }),
            trains_module_1.TrainsModule,
            station_module_1.StationModule,
            card_module_1.CardModule,
            ride_module_1.RideModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map