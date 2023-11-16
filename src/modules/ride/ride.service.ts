import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Ride } from '../../typeorm/entities/ride.entity';
import { DataSource, IsNull } from 'typeorm';
import { Card } from '../../typeorm/entities/card.entity';
import { StationService } from '../station/station.service';
import { CardService } from '../card/card.service';
import { TrainsService } from '../trains/trains.service';
import { ProjectError } from '../error/project.errors';
@Injectable()
export class RideService {
  constructor(
    private dataSource: DataSource,
    private stationService: StationService,
    private cardService: CardService,
    private trainService: TrainsService,
  ) {}
  private rideRepository = this.dataSource.getRepository(Ride);
  private cardRepository = this.dataSource.getRepository(Card);
  async create(createRideDto: CreateRideDto) {
    const card = await this.cardService.findOneByNumber(createRideDto.card);
    if (!card) {
      throw new ProjectError({
        name: 'CARD_NOT_EXIST_ERROR',
        message: "Credit Card doesn't exist in database",
      });
    }
    const station = await this.stationService.findOneByName(
      createRideDto.enteredStation,
    );
    if (!station) {
      throw new ProjectError({
        name: 'STATION_UNREACHABLE_ERROR',
        message: "Current Station doesn't exist in database",
      });
    }
    const train = await this.trainService.findTrainFareByStation(station.name);
    if (!train) {
      throw new ProjectError({
        name: 'TRAIN_FARE_NOT_EXIST_ERROR',
        message: 'Could not find a fare for this station?',
      });
    }
    card.balance = +card.balance + +train.fare;
    if (card.balance < 0) {
      throw new ProjectError({
        name: 'BROKE_BOY_ERROR',
        message: 'You do not have the sufficient funds for this ride.',
      });
    }

    const ride = new Ride();
    ride.fare = train.fare;
    ride.card = card;
    ride.enteredStation = station;
    await this.dataSource.manager.transaction(async (em) => {
      await em.getRepository(Card).save(card);
      await em.getRepository(Ride).save(ride);
    });
    return 'You have boarded the ' + train.name + ' train';
  }
  async createRide(rideDto: CreateRideDto) {
    const existingRide = await this.findByRunningRide(rideDto);
    if (existingRide) {
      throw new ProjectError({
        name: 'RIDE_UNFINISHED_ERROR',
        message: 'Please complete your existing ride before creating a new one',
      });
    }
    return await this.create(rideDto);
  }
  async findByRunningRide(rideDto: CreateRideDto | UpdateRideDto) {
    const card = await this.cardService.findOneByNumber(rideDto.card);
    return this.rideRepository.findOne({
      relations: {
        enteredStation: true,
        exitedStation: true,
        card: true,
      },
      where: {
        exitedStation: IsNull(),
        card: card,
      },
    });
  }
  async updateByRunningRide(updateRideDto: UpdateRideDto) {
    const runningRide = await this.findByRunningRide(updateRideDto);
    if (!runningRide) {
      throw new ProjectError({
        name: 'RIDE_NOT_EXIST_ERROR',
        message: 'There is no existing ride using this card number',
      });
    }
    runningRide.exitedStation = await this.stationService.findOneByName(
      updateRideDto.exitedAtStation,
    );
    if (
      !(await this.trainService.findOptimalRoute(
        runningRide.enteredStation,
        runningRide.exitedStation,
      ))
    ) {
      throw new ProjectError({
        name: 'STATION_UNREACHABLE_ERROR',
        message: 'Sorry you cannot reach this station from your entry point.',
      });
    }
    console.log(runningRide);
    await this.rideRepository.save(runningRide);
    return 'Card Balance is now ' + runningRide.card.balance;
  }
  async findRoute(rideDto: UpdateRideDto) {
    const originStation = await this.stationService.findOneByName(
      rideDto.enteredStation,
    );
    const exitStation = await this.stationService.findOneByName(
      rideDto.exitedAtStation,
    );
    return await this.trainService.findOptimalRoute(originStation, exitStation);
  }
}
