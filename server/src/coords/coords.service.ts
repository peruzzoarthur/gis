import { Injectable } from "@nestjs/common";
import { CreateCoordDto } from "./dto/create-coord.dto";
import { UpdateCoordDto } from "./dto/update-coord.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RawSqlDto } from "./dto/raw-sql.dto";
const fs = require("fs");
// const path = require("path");
import { Client } from "pg";
import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { PgService } from "src/pg/pg.service";

@Injectable()
export class CoordsService {
  constructor(
    private prisma: PrismaService,
    private pgService: PgService
  ) {}
  async create(createCoordDto: CreateCoordDto) {
    await this.prisma.$executeRaw`
      INSERT INTO "Location" (coords)
      VALUES (ST_SetSRID(ST_MakePoint(${createCoordDto.longitude}, ${createCoordDto.latitude}), 4326));
    `;

    const query = `SELECT * FROM "Location"`;
    await this.pgService.exportShapefile(
      query,
      "/home/ozzurep/Desktop/test/my_shapefile"
    );

    return "done";
  }

  async findAll() {
    const locations = await this.prisma.$queryRaw`
      SELECT "id", "createdAt", "updatedAt", ST_AsText("coords") AS "coords"
      FROM public."Location";
    `;
    return locations[0].coords;
  }

  async findNycStreets() {
    const streets = await this.prisma.$queryRaw`
    SELECT name, ST_AsText(geom) FROM public.nyc_streets
    ORDER BY gid ASC
    `;
    return streets;
  }
  findOne(id: number) {
    return `This action returns a #${id} coord`;
  }

  update(id: number, updateCoordDto: UpdateCoordDto) {
    return `This action updates a #${id} coord`;
  }

  remove(id: number) {
    return `This action removes a #${id} coord`;
  }
  async rawSql(rawSqlDto: RawSqlDto) {
    const rawSqlString: string = fs.readFileSync(
      rawSqlDto.path,
      // "/dev-arthur/Projects/Padel/server/prisma/test.sql",
      "utf8"
    );
    const sqlReducedToStatements = rawSqlString
      .split("\n")
      .filter((line) => !line.startsWith("--")) // remove comments-only lines
      .join("\n")
      .replace(/\r\n|\n|\r/g, " ") // remove newlines
      .replace(/\s+/g, " "); // excess white space

    const sqlStatements = splitStringByNotQuotedSemicolon(
      sqlReducedToStatements
    );
    for (const sql of sqlStatements) {
      console.log(sql);
      await this.prisma.$executeRawUnsafe(sql);
    }
  }
}

function splitStringByNotQuotedSemicolon(input: string): string[] {
  const result: string[] = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ";" && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}
