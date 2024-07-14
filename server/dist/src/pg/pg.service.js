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
exports.PgService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const child_process_1 = require("child_process");
const util_1 = require("util");
const path = require("path");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let PgService = class PgService {
    constructor() {
        this.pgClient = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
        });
        this.pgClient.connect();
    }
    async exportShapefile(query, outputPath) {
        const shapefilePath = path.resolve(outputPath);
        const pgsql2shpCommand = `pgsql2shp -f ${shapefilePath} -h ${this.pgClient.host} -p ${this.pgClient.port} -u ${this.pgClient.user} -P ${this.pgClient.password} ${this.pgClient.database} "${query.replace(/"/g, '\\"')}"`;
        try {
            await execAsync(pgsql2shpCommand);
            return shapefilePath;
        }
        catch (error) {
            throw new Error(`Failed to export shapefile: ${error.message}`);
        }
    }
};
exports.PgService = PgService;
exports.PgService = PgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PgService);
//# sourceMappingURL=pg.service.js.map