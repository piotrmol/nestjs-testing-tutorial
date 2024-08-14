import { HttpException, Injectable } from '@nestjs/common';
import { Movie } from './entity/movie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(movie: CreateMovieDto) {
    const existingMovie = await this.movieRepository.findOneBy({
      title: movie.title,
    });

    if (existingMovie) {
      throw new HttpException('Such movie already exists', 400);
    }
    await this.movieRepository.save(movie);
  }

  async updateMovie(movie: UpdateMovieDto, id: string) {
    await this.movieRepository.update({ id }, [movie]);
  }

  async getMovies(page: number, limit: number) {
    const [result, total] = await this.movieRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getMovie(id: string) {
    return this.movieRepository.findOneBy({ id });
  }

  async deleteMovie(id: string) {
    await this.movieRepository.delete(id);
  }
}
