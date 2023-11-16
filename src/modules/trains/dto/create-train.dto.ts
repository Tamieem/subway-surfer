export class CreateTrainDto {
  id: number;
  name: string;
  fare: number;
  stations: string[];
  stationTimes: number[];
}
