import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Controller('train-line')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainsService
      .create(createTrainDto)
      .then(() => 'Train Line Created!')
      .catch(
        () =>
          "Error occurred (it's a weird duplicate key violation). Please just try again.",
      );
  }

  @Get()
  findAll() {
    return this.trainsService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.trainsService.findOneById(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: number, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainsService.updateById(id, updateTrainDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: number) {
    return this.trainsService.remove(+id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.trainsService.findOneByName(name);
  }

  @Patch('/name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() updateTrainDto: UpdateTrainDto,
  ) {
    return this.trainsService.updateByName(name, updateTrainDto);
  }

  @Delete('/name/:name')
  removeByName(@Param('name') name: string) {
    return this.trainsService.remove(+name);
  }
}
