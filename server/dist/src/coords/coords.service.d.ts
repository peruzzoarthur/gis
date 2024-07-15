import { CreateCoordDto } from "./dto/create-coord.dto";
import { UpdateCoordDto } from "./dto/update-coord.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RawSqlDto } from "./dto/raw-sql.dto";
import { PgService } from "src/pg/pg.service";
export declare class CoordsService {
    private prisma;
    private pgService;
    constructor(prisma: PrismaService, pgService: PgService);
    create(createCoordDto: CreateCoordDto): Promise<string>;
    findAll(): Promise<unknown>;
    findNycStreets(): Promise<unknown>;
    findOne(id: number): string;
    update(id: number, updateCoordDto: UpdateCoordDto): string;
    remove(id: number): string;
    rawSql(rawSqlDto: RawSqlDto): Promise<void>;
}
