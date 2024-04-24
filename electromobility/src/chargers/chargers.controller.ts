import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    Param,
  } from '@nestjs/common';
import { ChargersService } from './chargers.service';
import { Charger } from './entities/charger.entity';
import { CreateChargerInput } from './dto/inputs';

@Controller('/')
export class ChargerController {
  constructor(private readonly chargersService: ChargersService) {}

  @Get("/chargePoints")
  getAllChargers(@Query() query: any) {
    console.log(query);
    return this.chargersService.findAll();
  }

  @Get('/chargePoints/:id')
  getCharger(@Param('id') id: string) {
    return this.chargersService.findOne(id);
  }

  @Post("/chargePoints")
  createCharger(@Body() charger: CreateChargerInput) {
    return this.chargersService.create(charger);
  }

  @Get("/bestChargingOption")
  getBestCharger(@Query('latitude') lat: string, @Query('longitude') lon: string) {
    return this.chargersService.findBest(lat, lon);
  }

}