import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CoordsService } from "./coords.service";
import { CreateCoordDto } from "./dto/create-coord.dto";
import { UpdateCoordDto } from "./dto/update-coord.dto";
import { RawSqlDto } from "./dto/raw-sql.dto";

@Controller("coords")
export class CoordsController {
  constructor(private readonly coordsService: CoordsService) {}

  @Post()
  create(@Body() createCoordDto: CreateCoordDto) {
    return this.coordsService.create(createCoordDto);
  }

  @Post("raw-sql")
  rawSql(@Body() rawSqlDto: RawSqlDto) {
    return this.coordsService.rawSql(rawSqlDto);
  }
  @Get()
  findAll() {
    return this.coordsService.findAll();
  }

  @Get("nyc-streets")
  findNycStreets() {
    return this.coordsService.findNycStreets();
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coordsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCoordDto: UpdateCoordDto) {
    return this.coordsService.update(+id, updateCoordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coordsService.remove(+id);
  }
}
