import { Injectable } from "@nestjs/common";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { SquareDto } from "./dto/square.dto";

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}
  create(createCityDto: CreateCityDto) {
    return "This action adds a new city";
  }

  async findAll(squareDto: SquareDto) {
    const cities = await this.prisma.$queryRaw`
      SELECT "id", "nm_mun", ST_AsText("geom") AS "geometry"
      FROM public."cities_rs"
      WHERE ST_Intersects(
        "geom",
        ST_MakeEnvelope(${squareDto.minX}, ${squareDto.minY}, ${squareDto.maxX}, ${squareDto.maxY}, 4326)
    );
    `;
    return cities;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
