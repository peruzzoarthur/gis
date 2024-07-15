import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { SquareDto } from "./dto/square.dto";
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    create(createCityDto: CreateCityDto): string;
    findAll(squareDto: SquareDto): Promise<unknown>;
    findOne(id: string): string;
    update(id: string, updateCityDto: UpdateCityDto): string;
    remove(id: string): string;
}
