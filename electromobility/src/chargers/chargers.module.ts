import { Module } from '@nestjs/common';
import { ChargersService } from './chargers.service';
import { ChargersResolver } from './chargers.resolver';
import { Charger } from './entities/charger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargerController } from './chargers.controller';

@Module({
  providers: [ChargersResolver, ChargersService],
  imports: [
    TypeOrmModule.forFeature([ Charger ])
  ],
  controllers: [ChargerController]
})
export class ChargersModule {}
