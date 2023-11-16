import {
  Entity,
  PrimaryGeneratedColumn,
  Column, ManyToMany, OneToMany
} from "typeorm";
import { Train } from './train.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Train, (train) => train.stations)
  trains: Train[];

}
