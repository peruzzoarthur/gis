import { PartialType } from '@nestjs/mapped-types';
import { CreateCoordDto } from './create-coord.dto';

export class UpdateCoordDto extends PartialType(CreateCoordDto) {}
