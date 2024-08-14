import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  createMovie(@Body() movie: CreateMovieDto) {
    return this.movieService.createMovie(movie);
  }

  @Patch('/:id')
  updateMovie(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() movie: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(movie, id);
  }

  @Delete('/:id')
  removeMovie(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.deleteMovie(id);
  }

  @Get()
  getPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.movieService.getMovies(page, limit);
  }

  @Get('/:id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.getMovie(id);
  }
}
