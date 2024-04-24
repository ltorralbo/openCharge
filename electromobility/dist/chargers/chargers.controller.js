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
exports.ChargerController = void 0;
const common_1 = require("@nestjs/common");
const chargers_service_1 = require("./chargers.service");
const inputs_1 = require("./dto/inputs");
let ChargerController = class ChargerController {
    constructor(chargersService) {
        this.chargersService = chargersService;
    }
    getAllChargers(query) {
        console.log(query);
        return this.chargersService.findAll();
    }
    getCharger(id) {
        return this.chargersService.findOne(id);
    }
    createCharger(charger) {
        return this.chargersService.create(charger);
    }
    getBestCharger(lat, lon) {
        return this.chargersService.findBest(lat, lon);
    }
};
exports.ChargerController = ChargerController;
__decorate([
    (0, common_1.Get)("/chargePoints"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChargerController.prototype, "getAllChargers", null);
__decorate([
    (0, common_1.Get)('/chargePoints/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChargerController.prototype, "getCharger", null);
__decorate([
    (0, common_1.Post)("/chargePoints"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.CreateChargerInput]),
    __metadata("design:returntype", void 0)
], ChargerController.prototype, "createCharger", null);
__decorate([
    (0, common_1.Get)("/bestChargingOption"),
    __param(0, (0, common_1.Query)('latitude')),
    __param(1, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChargerController.prototype, "getBestCharger", null);
exports.ChargerController = ChargerController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [chargers_service_1.ChargersService])
], ChargerController);
//# sourceMappingURL=chargers.controller.js.map