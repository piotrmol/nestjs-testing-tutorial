import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { movieGenres } from './create-movie.dto';

export class UpdateMovieDto {
  @IsOptional()
  @MinLength(3)
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  @IsIn(movieGenres)
  genre?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  length?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
}
