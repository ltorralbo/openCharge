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
exports.ChargersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const chargers_service_1 = require("./chargers.service");
const charger_entity_1 = require("./entities/charger.entity");
const index_1 = require("./dto/inputs/index");
let ChargersResolver = class ChargersResolver {
    constructor(chargersService) {
        this.chargersService = chargersService;
    }
    async createCharger(createChargerInput) {
        return this.chargersService.create(createChargerInput);
    }
    async findAll() {
        return this.chargersService.findAll();
    }
    async findOne(id) {
        return this.chargersService.findOne(id);
    }
    updateCharger(updateChargerInput) {
        return this.chargersService.update(updateChargerInput.id, updateChargerInput);
    }
    removeCharger(id) {
        return this.chargersService.remove(id);
    }
};
exports.ChargersResolver = ChargersResolver;
__decorate([
    (0, graphql_1.Mutation)(() => charger_entity_1.Charger),
    __param(0, (0, graphql_1.Args)('createChargerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.CreateChargerInput]),
    __metadata("design:returntype", Promise)
], ChargersResolver.prototype, "createCharger", null);
__decorate([
    (0, graphql_1.Query)(() => [charger_entity_1.Charger], { name: 'chargers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChargersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => charger_entity_1.Charger, { name: 'charger' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChargersResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => charger_entity_1.Charger),
    __param(0, (0, graphql_1.Args)('updateChargerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.UpdateChargerInput]),
    __metadata("design:returntype", void 0)
], ChargersResolver.prototype, "updateCharger", null);
__decorate([
    (0, graphql_1.Mutation)(() => charger_entity_1.Charger),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChargersResolver.prototype, "removeCharger", null);
exports.ChargersResolver = ChargersResolver = __decorate([
    (0, graphql_1.Resolver)(() => charger_entity_1.Charger),
    __metadata("design:paramtypes", [chargers_service_1.ChargersService])
], ChargersResolver);
//# sourceMappingURL=chargers.resolver.js.map