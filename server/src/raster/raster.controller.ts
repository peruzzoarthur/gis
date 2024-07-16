import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RasterService } from './raster.service';
import { CreateRasterDto } from './dto/create-raster.dto';
import { UpdateRasterDto } from './dto/update-raster.dto';

@Controller('raster')
export class RasterController {
  constructor(private readonly rasterService: RasterService) {}

  @Post()
  create(@Body() createRasterDto: CreateRasterDto) {
    return this.rasterService.create(createRasterDto);
  }

  @Get()
  findAll() {
    return this.rasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRasterDto: UpdateRasterDto) {
    return this.rasterService.update(+id, updateRasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rasterService.remove(+id);
  }
}
