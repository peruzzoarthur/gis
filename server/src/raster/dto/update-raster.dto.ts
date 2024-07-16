import { PartialType } from '@nestjs/mapped-types';
import { CreateRasterDto } from './create-raster.dto';

export class UpdateRasterDto extends PartialType(CreateRasterDto) {}
