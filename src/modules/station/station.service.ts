import { Injectable } from '@nestjs/common';
import { Station } from 'src/typeorm/entities/station.entity';
import { DataSource } from 'typeorm';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Train } from '../../typeorm/entities/train.entity';
import { ProjectError } from '../error/project.errors';

@Injectable()
export class StationService {
  constructor(private dataSource: DataSource) {}
  private stationRepository = this.dataSource.getRepository(Station);

  async create(createStationDto: CreateStationDto) {
    const station = await this.convertDtoToObject(createStationDto);
    return this.stationRepository.save(station);
  }

  async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async findOneById(id: number) {
    return this.stationRepository.findOneBy({ id: id });
  }

  async findOneByName(name: string) {
    const station = this.stationRepository.findOne({
      relations: {
        trains: true,
      },
      where: {
        name: name,
      },
    });
    if (!station) {
      throw new ProjectError({
        name: 'STATION_NOT_EXIST_ERROR',
        message: 'Sorry  ' + name + ' station does not exist in the database',
      });
    }
    return station;
  }

  async findByTrainLine(trainLine: string) {
    const train = await this.dataSource
      .getRepository(Train)
      .findOneBy({ name: trainLine });
    return this.findOneByName(train.name);
  }
  async updateById(id: number, updateStationDto: UpdateStationDto) {
    let station = await this.findOneById(id);
    const dtoStation = await this.convertDtoToObject(updateStationDto);
    station = { ...station, ...dtoStation };
    return await this.stationRepository.save(station);
  }

  async updateByName(name: string, updateStationDto: UpdateStationDto) {
    let station = await this.findOneByName(name);
    const dtoStation = await this.convertDtoToObject(updateStationDto);
    station = { ...station, ...dtoStation };
    return await this.stationRepository.save(station);
  }

  async remove(id: number) {
    const station = await this.findOneById(id);
    return await this.stationRepository.softRemove(station);
  }
  private async convertDtoToObject(updateStationDto: UpdateStationDto) {
    const station = new Station();
    if (updateStationDto.name) {
      station.name = updateStationDto.name;
    }
    if (updateStationDto.id) {
      station.id = updateStationDto.id;
    }

    return station;
  }
}
