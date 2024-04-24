"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargersModule = void 0;
const common_1 = require("@nestjs/common");
const chargers_service_1 = require("./chargers.service");
const chargers_resolver_1 = require("./chargers.resolver");
const charger_entity_1 = require("./entities/charger.entity");
const typeorm_1 = require("@nestjs/typeorm");
const chargers_controller_1 = require("./chargers.controller");
let ChargersModule = class ChargersModule {
};
exports.ChargersModule = ChargersModule;
exports.ChargersModule = ChargersModule = __decorate([
    (0, common_1.Module)({
        providers: [chargers_resolver_1.ChargersResolver, chargers_service_1.ChargersService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([charger_entity_1.Charger])
        ],
        controllers: [chargers_controller_1.ChargerController]
    })
], ChargersModule);
//# sourceMappingURL=chargers.module.js.map