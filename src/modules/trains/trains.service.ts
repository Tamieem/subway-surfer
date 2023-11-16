import { Injectable } from '@nestjs/common';
import { Train } from 'src/typeorm/entities/train.entity';
import { DataSource } from 'typeorm';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { Station } from '../../typeorm/entities/station.entity';
import { ProjectError } from '../error/project.errors';
import { StationTime } from '../../typeorm/entities/station-times.entity';
import { TrainSaveObjectDto } from './dto/train-save-object.dto';
@Injectable()
export class TrainsService {
  constructor(private dataSource: DataSource) {}
  private trainsRepository = this.dataSource.getRepository(Train);
  private stationRepository = this.dataSource.getRepository(Station);

  async create(createTrainDto: CreateTrainDto) {
    const saveObject = await this.convertDtoToObject(createTrainDto);
    await this.dataSource.manager.transaction((em) => {
      em.getRepository(Train).save(saveObject.train);
      em.getRepository(Station).save(saveObject.stations);
      em.getRepository(StationTime).save(saveObject.stationTimes);
    });
  }

  async findAll(): Promise<Train[]> {
    return this.trainsRepository.find({
      relations: {
        stations: true,
      },
    });
  }

  async findOneById(id: number) {
    return this.trainsRepository.find({
      relations: {
        stations: true,
      },
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string) {
    return this.trainsRepository.find({
      relations: {
        stations: true,
      },
      where: {
        name: name,
      },
    });
  }

  async findTrainFareByStation(station: string) {
    return this.trainsRepository.findOne({
      relations: {
        stations: true,
      },
      where: {
        stations: {
          name: station,
        },
      },
    });
  }
  async updateById(id: number, updateTrainDto: UpdateTrainDto) {
    let trains = await this.findOneById(id);
    const train = this.convertDtoToObject(updateTrainDto);
    trains = { ...trains, ...train };
    return await this.trainsRepository.save(trains);
  }

  async updateByName(name: string, updateTrainDto: UpdateTrainDto) {
    let trains = await this.findOneByName(name);
    const train = this.convertDtoToObject(updateTrainDto);
    trains = { ...trains, ...train };
    return await this.trainsRepository.save(trains);
  }

  async remove(id: number) {
    const trains = await this.findOneById(id);
    return await this.trainsRepository.softRemove(trains);
  }

  private async convertDtoToObject(trainDto: UpdateTrainDto) {
    const stations = [];
    const stationTimes = [];
    let currentStation = null;
    let nextStation = null;
    const i = 0;
    for (const stationName of trainDto.stations) {
      let station = await this.stationRepository.findOneBy({
        name: stationName,
      });
      if (!station) {
        station = new Station();
        station.name = stationName;
        stations.push(station);
      }
      if (currentStation === null) {
        currentStation = station;
      } else if (nextStation === null) {
        nextStation = station;
        const stationTime = new StationTime();
        stationTime.prevStation = currentStation;
        stationTime.nextStation = nextStation;
        stationTime.timeAllowance = trainDto.stationTimes[i];
        stationTimes.push(stationTime);
      }
      stations.push(station);
    }
    const train = new Train();
    if (trainDto.name) {
      train.name = trainDto.name;
    }
    if (trainDto.fare) {
      train.fare = trainDto.fare;
    }
    if (stations.length > 0) {
      train.stations = stations;
    }
    const trainSaveObject = new TrainSaveObjectDto();
    trainSaveObject.train = train;
    trainSaveObject.stations = stations;
    trainSaveObject.stationTimes = stationTimes;
    return trainSaveObject;
  }

  async findOptimalRoute(
    originStation: Station,
    destinationStation: Station,
  ): Promise<string[]> {
    const trainRepository = this.trainsRepository;
    async function findRouteRecursive(
      currentStation: Station,
      visitedStations: Set<number>,
      currentRoute: string[],
    ): Promise<string[] | null> {
      visitedStations.add(currentStation.id);
      currentRoute.push(currentStation.name);

      if (currentStation.id === destinationStation.id) {
        return currentRoute;
      }

      const trains = await trainRepository.find({
        relations: {
          stations: true,
        },
        where: {
          stations: {
            id: currentStation.id,
          },
        },
      });

      for (let train of trains) {
        train = await trainRepository.findOne({
          relations: {
            stations: true,
          },
          where: {
            name: train.name,
          },
        });
        const nextStations = train.stations.filter(
          (station) => !visitedStations.has(station.id),
        );
        for (const nextStation of nextStations) {
          const route = await findRouteRecursive(
            nextStation,
            visitedStations,
            currentRoute,
          );

          if (route) {
            return route;
          }
        }
      }
      currentRoute.pop();
      return null;
    }

    const optimalRoute = await findRouteRecursive(originStation, new Set(), []);

    if (optimalRoute) {
      return optimalRoute;
    } else {
      throw new ProjectError({
        name: 'STATION_UNREACHABLE_ERROR',
        message: 'The ride is not possible at this moment',
      });
    }
  }
}
