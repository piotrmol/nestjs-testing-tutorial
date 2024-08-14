import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './entity/movie';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MovieService],
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([Movie])],
})
export class MovieModule {}
