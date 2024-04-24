import { ChargersService } from './chargers.service';
import { Charger } from './entities/charger.entity';
import { UpdateChargerInput, CreateChargerInput } from './dto/inputs/index';
export declare class ChargersResolver {
    private readonly chargersService;
    constructor(chargersService: ChargersService);
    createCharger(createChargerInput: CreateChargerInput): Promise<Charger>;
    findAll(): Promise<Charger[]>;
    findOne(id: string): Promise<Charger>;
    updateCharger(updateChargerInput: UpdateChargerInput): string;
    removeCharger(id: number): string;
}
