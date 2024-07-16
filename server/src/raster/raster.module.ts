import { Module } from "@nestjs/common";
import { RasterService } from "./raster.service";
import { RasterController } from "./raster.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [RasterController],
  providers: [RasterService, PrismaService],
})
export class RasterModule {}
