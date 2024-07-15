import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { SquareDto } from "./dto/square.dto";
export declare class CitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCityDto: CreateCityDto): string;
    findAll(squareDto: SquareDto): Promise<unknown>;
    findOne(id: number): string;
    update(id: number, updateCityDto: UpdateCityDto): string;
    remove(id: number): string;
}
