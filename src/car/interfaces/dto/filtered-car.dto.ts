import { IsOptional, IsString } from 'class-validator';

export class FilteredCarsByColorOrBrandDto {
  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  color: string;
}
