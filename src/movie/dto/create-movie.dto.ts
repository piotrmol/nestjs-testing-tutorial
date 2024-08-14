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

export const movieGenres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Horror',
  'Science Fiction',
  'Fantasy',
  'Thriller',
  'Romance',
  'Documentary',
] as const;

export class CreateMovieDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  @MaxLength(1000)
  description?: string;

  @MinLength(3)
  @IsString()
  @IsIn(movieGenres)
  genre: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;
}
