import { IsNotEmpty, IsNumber } from "class-validator";

export class SquareDto {
  @IsNotEmpty()
  @IsNumber()
  minX: number;
  @IsNotEmpty()
  @IsNumber()
  minY: number;
  @IsNotEmpty()
  @IsNumber()
  maxX: number;
  @IsNotEmpty()
  @IsNumber()
  maxY: number;
}
