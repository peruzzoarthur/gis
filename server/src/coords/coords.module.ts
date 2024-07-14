import { Module } from "@nestjs/common";
import { CoordsService } from "./coords.service";
import { CoordsController } from "./coords.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PgService } from "src/pg/pg.service";

@Module({
  controllers: [CoordsController],
  providers: [CoordsService, PrismaService, PgService],
})
export class CoordsModule {}
