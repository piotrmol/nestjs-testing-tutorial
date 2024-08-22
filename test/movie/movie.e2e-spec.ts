import * as request from 'supertest';

describe('movie API', () => {
  it('returns empty array when there are no movies in db', async () => {
    const response = await request(global.app.getHttpServer()).get('/movie');

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
    expect(response.body.totalPages).toBe(0);
  });
});
