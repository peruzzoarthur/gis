import { Module } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CitiesController } from "./cities.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PgService } from "src/pg/pg.service";

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, PrismaService, PgService],
})
export class CitiesModule {}
