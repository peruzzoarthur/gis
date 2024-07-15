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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CitiesService = class CitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createCityDto) {
        return "This action adds a new city";
    }
    async findAll(squareDto) {
        const cities = await this.prisma.$queryRaw `
      SELECT "id", "nm_mun", ST_AsText("geom") AS "geometry"
      FROM public."cities_rs"
      WHERE ST_Intersects(
        "geom",
        ST_MakeEnvelope(${squareDto.minX}, ${squareDto.minY}, ${squareDto.maxX}, ${squareDto.maxY}, 4326)
    );
    `;
        return cities;
    }
    findOne(id) {
        return `This action returns a #${id} city`;
    }
    update(id, updateCityDto) {
        return `This action updates a #${id} city`;
    }
    remove(id) {
        return `This action removes a #${id} city`;
    }
};
exports.CitiesService = CitiesService;
exports.CitiesService = CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CitiesService);
//# sourceMappingURL=cities.service.js.map