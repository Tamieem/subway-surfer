import { PrimaryGeneratedColumn } from "typeorm";
import { Station } from "./station.entity";

export class StationTime {
  @PrimaryGeneratedColumn()
  id: number;

  prevStation: Station;

  nextStation: Station;

  timeAllowance: number;
}