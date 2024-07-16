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
exports.RasterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs_1 = require("fs");
let RasterService = class RasterService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createRasterDto) {
        return "This action adds a new raster";
    }
    async findAll() {
        const page = 1;
        const limit = 1;
        const offset = (page - 1) * limit;
        const mdt = await this.prisma.$queryRaw `
      SELECT ST_AsHexWKB(rast) as hex
      FROM public.srtm_bhasb
      ORDER BY rid ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
        const hexArray = mdt.flatMap((mdt) => mdt.hex);
        const file = await fs_1.promises.readFile("/dev-arthur/Projects/fullstack-gis/data/MDT_BHASB_4326_2.tif");
        return hexArray.toString();
    }
    findOne(id) {
        return `This action returns a #${id} raster`;
    }
    update(id, updateRasterDto) {
        return `This action updates a #${id} raster`;
    }
    remove(id) {
        return `This action removes a #${id} raster`;
    }
};
exports.RasterService = RasterService;
exports.RasterService = RasterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RasterService);
//# sourceMappingURL=raster.service.js.map