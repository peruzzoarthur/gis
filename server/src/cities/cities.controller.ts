import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { SquareDto } from "./dto/square.dto";

@Controller("cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Post("squared")
  findAll(@Body() squareDto: SquareDto) {
    return this.citiesService.findAll(squareDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.citiesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(+id, updateCityDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.citiesService.remove(+id);
  }
}
