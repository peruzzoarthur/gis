import { CreateRasterDto } from "./dto/create-raster.dto";
import { UpdateRasterDto } from "./dto/update-raster.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class RasterService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRasterDto: CreateRasterDto): string;
    findAll(): Promise<string>;
    findOne(id: number): string;
    update(id: number, updateRasterDto: UpdateRasterDto): string;
    remove(id: number): string;
}
