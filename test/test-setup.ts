import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { runMigrations } from '../src/migrations/migration-runner';

declare global {
  // eslint-disable-next-line no-var
  var app: INestApplication | undefined;
}

module.exports = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  await app.init(); //must be after registering validation pipeline
  await runMigrations();

  global.app = app;
};
