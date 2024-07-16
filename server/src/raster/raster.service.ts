import { Injectable } from "@nestjs/common";
import { CreateRasterDto } from "./dto/create-raster.dto";
import { UpdateRasterDto } from "./dto/update-raster.dto";
import { PrismaService } from "src/prisma/prisma.service";
type RasterRow = {
  rid: number;
  hex: string;
};

import * as fs from "fs/promises";

// Convert file to hex string
const fileToHex = async (filePath: string): Promise<string> => {
  const fileBuffer = await fs.readFile(filePath);
  return fileBuffer.toString("hex");
};

// Compare hex string with file data
const compareHexAndFile = async (hex: string, filePath: string) => {
  const fileHex = await fileToHex(filePath);
  return hex === fileHex;
};

@Injectable()
export class RasterService {
  constructor(private prisma: PrismaService) {}

  create(createRasterDto: CreateRasterDto) {
    return "This action adds a new raster";
  }
  async findAll() {
    const page = 1;
    const limit = 1;
    // const hexToArrayBuffer = (hex: string): ArrayBuffer => {
    //   const typedArray = new Uint8Array(
    //     hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    //   );
    //   return typedArray.buffer;
    // };
    const offset = (page - 1) * limit;

    const mdt = await this.prisma.$queryRaw<RasterRow[]>`
      SELECT ST_AsHexWKB(rast) as hex
      FROM public.srtm_bhasb
      ORDER BY rid ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    // mdt.map((row) => {
    //   console.log(hexToArrayBuffer(row.rast_hex));
    // });
    const hexArray = mdt.flatMap((mdt) => mdt.hex);
    // const file = await fs.readFile("/dev-arthur/GIS/srtm/srtm.tif")
    // const file = await fileToHex(
    //   "/dev-arthur/Projects/fullstack-gis/data/nepal_lc_2020_converted.tif"
    // );
    const file = await fileToHex(
      "/dev-arthur/Projects/fullstack-gis/data/MDT_BHASB_4326_2.tif"
    );
    // console.log(hexArray);
    // console.log(file);
    return file;
  }
  findOne(id: number) {
    return `This action returns a #${id} raster`;
  }

  update(id: number, updateRasterDto: UpdateRasterDto) {
    return `This action updates a #${id} raster`;
  }

  remove(id: number) {
    return `This action removes a #${id} raster`;
  }
}
