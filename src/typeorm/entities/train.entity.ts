// models/TrainLine.ts
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Station } from './station.entity';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'decimal', default: 12.5 })
  fare: number;

  @ManyToMany(() => Station, (station) => station.trains)
  @JoinTable()
  stations: Station[];

  @Column()
  stationTimes: number[];
}
