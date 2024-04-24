import { UpdateChargerInput, CreateChargerInput } from './dto/inputs/index';
import { Charger } from './entities/charger.entity';
import { Repository } from 'typeorm';
export declare class ChargersService {
    private readonly chargerRepository;
    constructor(chargerRepository: Repository<Charger>);
    private chargers;
    create(createChargerInput: CreateChargerInput): Promise<Charger>;
    findAll(): Promise<Charger[]>;
    findOne(id: string): Promise<Charger>;
    findBest(lat: string, lon: string): Promise<any>;
    update(id: number, updateChargerInput: UpdateChargerInput): string;
    remove(id: number): string;
    private calculateDistance;
    private deg2rad;
}
