import { RasterService } from './raster.service';
import { CreateRasterDto } from './dto/create-raster.dto';
import { UpdateRasterDto } from './dto/update-raster.dto';
export declare class RasterController {
    private readonly rasterService;
    constructor(rasterService: RasterService);
    create(createRasterDto: CreateRasterDto): string;
    findAll(): Promise<string>;
    findOne(id: string): string;
    update(id: string, updateRasterDto: UpdateRasterDto): string;
    remove(id: string): string;
}
