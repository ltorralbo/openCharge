import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateChargerInput, CreateChargerInput} from './dto/inputs/index';
import { Charger } from './entities/charger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChargersService {

  constructor(
    @InjectRepository( Charger )
    private readonly chargerRepository: Repository<Charger>,
  ) {}

  private chargers: Charger[] = [
    {
      "id": "34ff4cb7-87e5-4f4f-9b1e-26a4f25f528a",
      "status": "ok",
      "operator": "2323",
      "connections": 2,
      "latitude": "232323",
      "longitude": "232323",
      "country": "chile",
      "power": 12
    },
    {
      "id": "c8007dd8-d9ed-4b45-847a-ac06fa1ff96d",
      "status": "ok",
      "operator": "2323",
      "connections": 2,
      "latitude": "232323",
      "longitude": "232323",
      "country": "chile",
      "power": 2
    },
    {
      "id": "90f10f2c-6f01-4ef8-93be-076740707c4d",
      "status": "ok",
      "operator": "2323",
      "connections": 1,
      "latitude": "232121212323",
      "longitude": "121212",
      "country": "chile",
      "power": 75
    }
  ];

  async create(createChargerInput: CreateChargerInput): Promise<Charger> {
      const newCharger = this.chargerRepository.create( createChargerInput )
      return await this.chargerRepository.save( newCharger );
  }

  async findAll(): Promise<Charger[]>{
    return this.chargerRepository.find();
  }

  async findOne(id: string) : Promise<Charger> {
  
    const charger = await this.chargerRepository.findOneBy({ id })
    if(!charger) throw new NotFoundException(`Charger whit id: ${ id } not found`)

    return charger
  }

  async findBest(lat: string, lon: string) : Promise<any> {
    const chargers = await this.findAll();

    let bestChargerDistance: Charger | undefined;
    let bestChargerPower: Charger | undefined;

    let minDistance = Number.MAX_VALUE;
    let maxPower = 0;

    for (const charger of chargers) {
      const distance = this.calculateDistance(lat, lon, charger.latitude, charger.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        bestChargerDistance  = charger;
      }

      // Verificamos si es el cargador con mayor potencia
      if (charger.power > maxPower) {
        maxPower = charger.power;
        bestChargerPower = charger;
      }
    }

    if (!bestChargerDistance || !bestChargerPower) {
      throw new NotFoundException('No chargers found.');
    }

    return {
      chargePointBestDistance: bestChargerDistance,
      chargePointBestPower: bestChargerPower
    };
  }

  update(id: number, updateChargerInput: UpdateChargerInput) {
    return `This action updates a #${id} charger`;
  }

  remove(id: number) {
    return `This action removes a #${id} charger`;
  }

  private calculateDistance(lat1: string, lon1: string, lat2: string, lon2: string): number {

    const R = 6371; // Radio de la tierra en km
    const dLat = this.deg2rad(parseFloat(lat2) - parseFloat(lat1));
    const dLon = this.deg2rad(parseFloat(lon2) - parseFloat(lon1));
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(parseFloat(lat1))) * Math.cos(this.deg2rad(parseFloat(lat2))) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en km
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
