import { IsOptional, IsString } from 'class-validator';

export class FilteredDriversDto {
  @IsOptional()
  @IsString()
  name: string;
}
