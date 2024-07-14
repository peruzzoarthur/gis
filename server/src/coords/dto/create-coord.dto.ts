import { IsLatitude, IsLongitude } from "class-validator";

export class CreateCoordDto {
  @IsLatitude()
  latitude: number;
  @IsLongitude()
  longitude: number;
}
