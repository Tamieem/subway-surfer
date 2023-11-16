type ErrorName =
  | 'CARD_NOT_EXIST_ERROR'
  | 'BROKE_BOY_ERROR'
  | 'RIDE_UNFINISHED_ERROR'
  | 'RIDE_NOT_EXIST_ERROR'
  | 'STATION_UNREACHABLE_ERROR'
  | 'TRAIN_FARE_NOT_EXIST_ERROR'
  | 'STATION_NOT_EXIST_ERROR';
export class ProjectError extends Error {
  name: ErrorName;
  message: string;
  cause: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name: ErrorName;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
