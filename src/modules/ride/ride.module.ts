import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { CardModule } from '../card/card.module';
import { TrainsModule } from '../trains/trains.module';
import { CardService } from '../card/card.service';
import { TrainsService } from '../trains/trains.service';
import { StationService } from '../station/station.service';

@Module({
  imports: [CardModule, TrainsModule],
  controllers: [RideController],
  providers: [RideService, StationService, CardService, TrainsService],
})
export class RideModule {}
