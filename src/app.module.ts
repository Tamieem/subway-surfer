// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainsModule } from './modules/trains/trains.module';
import { StationModule } from './modules/station/station.module';
import { CardModule } from './modules/card/card.module';
import { RideModule } from './modules/ride/ride.module';
import { StationTime } from "./typeorm/entities/station-times.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alpine',
      database: 'postgres',
      entities: [`${__dirname}/typeorm/entities/*{.js,.ts}`],
      synchronize: true, // do not use in prod
    }),
    TrainsModule,
    StationModule,
    CardModule,
    RideModule,
    StationTime,
  ],
})
export class AppModule {}
