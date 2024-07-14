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
exports.CoordsController = void 0;
const common_1 = require("@nestjs/common");
const coords_service_1 = require("./coords.service");
const create_coord_dto_1 = require("./dto/create-coord.dto");
const update_coord_dto_1 = require("./dto/update-coord.dto");
const raw_sql_dto_1 = require("./dto/raw-sql.dto");
let CoordsController = class CoordsController {
    constructor(coordsService) {
        this.coordsService = coordsService;
    }
    create(createCoordDto) {
        return this.coordsService.create(createCoordDto);
    }
    rawSql(rawSqlDto) {
        return this.coordsService.rawSql(rawSqlDto);
    }
    findAll() {
        return this.coordsService.findAll();
    }
    findNycStreets() {
        return this.coordsService.findNycStreets();
    }
    findOne(id) {
        return this.coordsService.findOne(+id);
    }
    update(id, updateCoordDto) {
        return this.coordsService.update(+id, updateCoordDto);
    }
    remove(id) {
        return this.coordsService.remove(+id);
    }
};
exports.CoordsController = CoordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coord_dto_1.CreateCoordDto]),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("raw-sql"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [raw_sql_dto_1.RawSqlDto]),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "rawSql", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("nyc-streets"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "findNycStreets", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coord_dto_1.UpdateCoordDto]),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoordsController.prototype, "remove", null);
exports.CoordsController = CoordsController = __decorate([
    (0, common_1.Controller)("coords"),
    __metadata("design:paramtypes", [coords_service_1.CoordsService])
], CoordsController);
//# sourceMappingURL=coords.controller.js.map