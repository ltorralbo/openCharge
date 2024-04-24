import { ChargersService } from './chargers.service';
import { Charger } from './entities/charger.entity';
import { CreateChargerInput } from './dto/inputs';
export declare class ChargerController {
    private readonly chargersService;
    constructor(chargersService: ChargersService);
    getAllChargers(query: any): Promise<Charger[]>;
    getCharger(id: string): Promise<Charger>;
    createCharger(charger: CreateChargerInput): Promise<Charger>;
    getBestCharger(lat: string, lon: string): Promise<any>;
}
