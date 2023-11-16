import { Card } from './card.entity';
import { Station } from './station.entity';
export declare class Ride {
    id: number;
    card: Card;
    enteredStation: Station;
    exitedStation: Station;
    fare: number;
    startedAt: Date;
    endedAt: Date;
}
