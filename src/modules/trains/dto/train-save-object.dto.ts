import { Train } from "../../../typeorm/entities/train.entity";
import { StationTime } from "../../../typeorm/entities/station-times.entity";
import { Station } from "../../../typeorm/entities/station.entity";

export class TrainSaveObjectDto {
  train: Train;

  stations: Station[];

  stationTimes: StationTime[];
}