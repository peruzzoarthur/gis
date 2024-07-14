import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CoordsModule } from "./coords/coords.module";
import { PgModule } from "./pg/pg.module";

@Module({
  imports: [PrismaModule, CoordsModule, PgModule],
})
export class AppModule {}
