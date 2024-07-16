import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CoordsModule } from "./coords/coords.module";
import { PgModule } from "./pg/pg.module";
import { CitiesModule } from './cities/cities.module';
import { RasterModule } from './raster/raster.module';

@Module({
  imports: [PrismaModule, CoordsModule, PgModule, CitiesModule, RasterModule],
})
export class AppModule {}
