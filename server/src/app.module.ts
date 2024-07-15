import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CoordsModule } from "./coords/coords.module";
import { PgModule } from "./pg/pg.module";
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [PrismaModule, CoordsModule, PgModule, CitiesModule],
})
export class AppModule {}
