import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.stationService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOneById(+id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationService.updateById(+id, updateStationDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(+id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.stationService.findOneByName(name);
  }

  @Patch('/name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() updateStationDto: UpdateStationDto,
  ) {
    return this.stationService.updateByName(name, updateStationDto);
  }

  @Delete('/name/:name')
  removeByName(@Param('name') name: string) {
    return this.stationService.remove(+name);
  }
}
