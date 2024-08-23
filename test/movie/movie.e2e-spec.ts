import { INestApplication } from '@nestjs/common';
import { Movie } from '../../src/movie/entity/movie';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { title } from 'process';

const newMovie = {
  title: 'test title',
  description: 'test description',
  genre: 'Comedy',
  length: 100,
  rating: 2.3,
};

describe('movie API', () => {
  let app: INestApplication;
  let repository: Repository<Movie>;

  beforeAll(() => {
    app = global.app;
    repository = app.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  afterEach(async () => {
    await repository.query('TRUNCATE TABLE movie;');
  });

  it('returns empty array when there are no movies in db', async () => {
    const response = await request(app.getHttpServer()).get('/movie');

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
    expect(response.body.totalPages).toBe(0);
  });

  it('creates a new movie', async () => {
    const createMovieResponse = await request(app.getHttpServer())
      .post('/movie')
      .send(newMovie);

    expect(createMovieResponse.status).toBe(201);

    const getMoviesResponse = await request(app.getHttpServer()).get('/movie');
    const movies = getMoviesResponse.body.data;
    expect(movies.length).toBe(1);
    expect(movies[0].title).toBe(newMovie.title);
    expect(movies[0].description).toBe(newMovie.description);
    expect(movies[0].genre).toBe(newMovie.genre);
    expect(movies[0].length).toBe(newMovie.length);
    expect(movies[0].rating).toBe(newMovie.rating.toString());
    expect(movies[0].id).toBeDefined();
  });

  it('throws error when movie exists', async () => {
    const createMovieResponse = await request(app.getHttpServer())
      .post('/movie')
      .send(newMovie);

    expect(createMovieResponse.status).toBe(201);

    const errorResponse = await request(app.getHttpServer())
      .post('/movie')
      .send(newMovie);

    expect(errorResponse.status).toBe(400);
    expect(errorResponse.body.message).toBe('Such movie already exists');
  });

  it('throws validation error when title is not provided', async () => {
    const createMovieResponse = await request(app.getHttpServer())
      .post('/movie')
      .send({ ...newMovie, title: undefined });

    expect(createMovieResponse.status).toBe(400);
    expect(createMovieResponse.body.message).toContain(
      'title should not be empty',
    );
  });

  it('get list of movies and pagination data', async () => {
    await repository.insert([
      newMovie,
      { ...newMovie, title: 'second title' },
      { ...newMovie, title: 'third title' },
    ]);

    const response = await request(app.getHttpServer()).get(
      '/movie?page=1&limit=2',
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(response.body.totalPages).toBe(2);
  });

  it.todo('cover rest of endpoints');
});
