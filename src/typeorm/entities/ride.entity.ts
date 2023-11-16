// models/Ride.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Station } from './station.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.id)
  @JoinColumn()
  card: Card;

  @ManyToOne(() => Station, (station) => station.id)
  @JoinColumn()
  enteredStation: Station;

  @ManyToOne(() => Station, (station) => station.id)
  @JoinColumn()
  exitedStation: Station;

  @Column({ type: 'decimal' })
  fare: number;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  endedAt: Date;
}
