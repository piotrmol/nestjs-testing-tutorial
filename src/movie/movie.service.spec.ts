import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entity/movie';

const movieRepositoryMock = {
  save: jest.fn(),
  findOneBy: jest.fn(),
  findAndCount: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const movie = {
  title: 'test title',
  description: 'test description',
  genre: 'Comedy',
  length: 100,
  rating: 2.3,
};

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: movieRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save method', async () => {
    movieRepositoryMock.findOneBy.mockResolvedValue(undefined);
    const result = await service.createMovie(movie);
    expect(result).toBeUndefined();
    expect(movieRepositoryMock.save).toHaveBeenCalledWith(movie);
  });

  it('should throw http error when title already exists', async () => {
    const title = 'Movie title';
    movieRepositoryMock.findOneBy.mockResolvedValue({ title, id: 'test-id' });

    await expect(service.createMovie(movie)).rejects.toThrow(
      'Such movie already exists',
    );
  });

  it.todo('calls update method');

  it('should return array of movies and pagination data', async () => {
    const movies = [movie, movie];
    movieRepositoryMock.findAndCount.mockResolvedValue([movies, 2]);
    const result = await service.getMovies(1, 10);

    expect(result.data).toBe(movies);
    expect(result.currentPage).toBe(1);
    expect(result.count).toBe(2);
    expect(result.totalPages).toBe(1);
  });

  it.each([
    { total: 10, result: 1 },
    { total: 11, result: 2 },
    { total: 112, result: 12 },
    { total: 0, result: 0 },
  ])('should properly count totalPages', async ({ total, result }) => {
    movieRepositoryMock.findAndCount.mockResolvedValue([[], total]);
    const getMoviesResult = await service.getMovies(1, 10);
    expect(getMoviesResult.totalPages).toBe(result);
  });
});
