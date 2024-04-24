"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargersService = void 0;
const common_1 = require("@nestjs/common");
const charger_entity_1 = require("./entities/charger.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ChargersService = class ChargersService {
    constructor(chargerRepository) {
        this.chargerRepository = chargerRepository;
        this.chargers = [
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
    }
    async create(createChargerInput) {
        const newCharger = this.chargerRepository.create(createChargerInput);
        return await this.chargerRepository.save(newCharger);
    }
    async findAll() {
        return this.chargerRepository.find();
    }
    async findOne(id) {
        const charger = await this.chargerRepository.findOneBy({ id });
        if (!charger)
            throw new common_1.NotFoundException(`Charger whit id: ${id} not found`);
        return charger;
    }
    async findBest(lat, lon) {
        const chargers = await this.findAll();
        let bestChargerDistance;
        let bestChargerPower;
        let minDistance = Number.MAX_VALUE;
        let maxPower = 0;
        for (const charger of chargers) {
            const distance = this.calculateDistance(lat, lon, charger.latitude, charger.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                bestChargerDistance = charger;
            }
            if (charger.power > maxPower) {
                maxPower = charger.power;
                bestChargerPower = charger;
            }
        }
        if (!bestChargerDistance || !bestChargerPower) {
            throw new common_1.NotFoundException('No chargers found.');
        }
        return {
            chargePointBestDistance: bestChargerDistance,
            chargePointBestPower: bestChargerPower
        };
    }
    update(id, updateChargerInput) {
        return `This action updates a #${id} charger`;
    }
    remove(id) {
        return `This action removes a #${id} charger`;
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(parseFloat(lat2) - parseFloat(lat1));
        const dLon = this.deg2rad(parseFloat(lon2) - parseFloat(lon1));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(parseFloat(lat1))) * Math.cos(this.deg2rad(parseFloat(lat2))) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
};
exports.ChargersService = ChargersService;
exports.ChargersService = ChargersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(charger_entity_1.Charger)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChargersService);
//# sourceMappingURL=chargers.service.js.map