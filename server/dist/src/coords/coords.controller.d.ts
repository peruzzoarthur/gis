import { CoordsService } from "./coords.service";
import { CreateCoordDto } from "./dto/create-coord.dto";
import { UpdateCoordDto } from "./dto/update-coord.dto";
import { RawSqlDto } from "./dto/raw-sql.dto";
export declare class CoordsController {
    private readonly coordsService;
    constructor(coordsService: CoordsService);
    create(createCoordDto: CreateCoordDto): Promise<string>;
    rawSql(rawSqlDto: RawSqlDto): Promise<void>;
    findAll(): Promise<unknown>;
    findNycStreets(): Promise<unknown>;
    findOne(id: string): string;
    update(id: string, updateCoordDto: UpdateCoordDto): string;
    remove(id: string): string;
}
