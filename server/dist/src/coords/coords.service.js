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
exports.CoordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const pg_service_1 = require("../pg/pg.service");
let CoordsService = class CoordsService {
    constructor(prisma, pgService) {
        this.prisma = prisma;
        this.pgService = pgService;
    }
    async create(createCoordDto) {
        await this.prisma.$executeRaw `
      INSERT INTO "Location" (coords)
      VALUES (ST_SetSRID(ST_MakePoint(${createCoordDto.longitude}, ${createCoordDto.latitude}), 4326));
    `;
        const query = `SELECT * FROM "Location"`;
        await this.pgService.exportShapefile(query, "/home/ozzurep/Desktop/test/my_shapefile");
        return "done";
    }
    async findAll() {
        const locations = await this.prisma.$queryRaw `
      SELECT "id", "createdAt", "updatedAt", ST_AsText("coords") AS "coords"
      FROM public."Location";
    `;
        return locations[0].coords;
    }
    async findNycStreets() {
        const streets = await this.prisma.$queryRaw `
    SELECT name, ST_AsText(geom) FROM public.nyc_streets
    ORDER BY gid ASC
    `;
        return streets;
    }
    findOne(id) {
        return `This action returns a #${id} coord`;
    }
    update(id, updateCoordDto) {
        return `This action updates a #${id} coord`;
    }
    remove(id) {
        return `This action removes a #${id} coord`;
    }
    async rawSql(rawSqlDto) {
        const rawSqlString = fs.readFileSync(rawSqlDto.path, "utf8");
        const sqlReducedToStatements = rawSqlString
            .split("\n")
            .filter((line) => !line.startsWith("--"))
            .join("\n")
            .replace(/\r\n|\n|\r/g, " ")
            .replace(/\s+/g, " ");
        const sqlStatements = splitStringByNotQuotedSemicolon(sqlReducedToStatements);
        for (const sql of sqlStatements) {
            console.log(sql);
            await this.prisma.$executeRawUnsafe(sql);
        }
    }
};
exports.CoordsService = CoordsService;
exports.CoordsService = CoordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pg_service_1.PgService])
], CoordsService);
function splitStringByNotQuotedSemicolon(input) {
    const result = [];
    let currentSplitIndex = 0;
    let isInString = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "'") {
            isInString = !isInString;
        }
        if (input[i] === ";" && !isInString) {
            result.push(input.substring(currentSplitIndex, i + 1));
            currentSplitIndex = i + 2;
        }
    }
    return result;
}
//# sourceMappingURL=coords.service.js.map