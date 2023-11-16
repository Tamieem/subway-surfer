import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { ProjectError } from '../error/project.errors';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  // @Get()
  // findAll() {
  //   return this.rideService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.rideService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
  //   return this.rideService.update(+id, updateRideDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rideService.remove(+id);
  // }
  @Post('/:station/enter')
  beginRideAtStation(
    @Param('station') name: string,
    @Body() createRideDto: CreateRideDto,
  ) {
    if (!createRideDto.card) {
      return 'Please input valid card data';
    }
    createRideDto.enteredStation = name;
    return this.rideService
      .createRide(createRideDto)
      .catch(
        (pe: ProjectError) => 'Error received: ' + pe.name + '\n' + pe.message,
      );
  }
  @Post('/:station/exit')
  exitRideAtStation(
    @Param('station') name: string,
    @Body() updateRideDto: UpdateRideDto,
  ) {
    if (!updateRideDto.card) {
      return 'Please input valid card data';
    }
    updateRideDto.exitedAtStation = name;
    updateRideDto.endedAt = new Date();
    return this.rideService
      .updateByRunningRide(updateRideDto)
      .then((message) => 'Ride Completed!\n' + message)
      .catch(
        (pe: ProjectError) => 'Error received: ' + pe.name + '\n' + pe.message,
      );
  }

  @Get('/:origin/:destination')
  findRoute(
    @Param('origin') originStation: string,
    @Param('destination') destinationStation: string,
  ) {
    const updateRideDto = new UpdateRideDto();
    updateRideDto.enteredStation = originStation;
    updateRideDto.exitedAtStation = destinationStation;
    return this.rideService
      .findRoute(updateRideDto)
      .catch(
        (pe: ProjectError) => 'Error received: ' + pe.name + '\n' + pe.message,
      );
  }
}
