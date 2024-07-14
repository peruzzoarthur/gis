import { IsString } from "class-validator";

export class RawSqlDto {
  @IsString()
  path: string;
}
