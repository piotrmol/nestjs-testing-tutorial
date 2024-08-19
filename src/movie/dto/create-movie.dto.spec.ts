import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

describe('CreateMovieDto validation', () => {
  it('fails validation when title is empty', async () => {
    const movie = plainToInstance(CreateMovieDto, {
      title: '',
      description: 'description',
      genre: 'Comedy',
      length: 10,
      rating: 1.2,
    });
    const errors = await validate(movie);
    expect(errors[0].constraints.isNotEmpty).toBeDefined();
  });

  it('fails validation when title is too short', async () => {
    const movie = plainToInstance(CreateMovieDto, {
      title: 'aa',
      description: 'description',
      genre: 'Comedy',
      length: 10,
      rating: 1.2,
    });
    const errors = await validate(movie);
    expect(errors[0].constraints.minLength).toBeDefined();
  });

  it.todo('Add more test cases for dto validation');
});
