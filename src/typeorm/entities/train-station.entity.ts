import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Train } from './train.entity';
import { Station } from './station.entity';

@Entity('train_stations_station')
export class TrainStationsStation {
  @PrimaryColumn()
  stationId: number;

  @PrimaryColumn()
  trainId: number;

  @ManyToOne(() => Train, (train) => train.stations)
  train: Train;

  @ManyToOne(() => Station, (station) => station.trains)
  station: Station;
}
