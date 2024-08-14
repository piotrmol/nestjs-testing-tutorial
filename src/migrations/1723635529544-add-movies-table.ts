import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddMoviesTable1723635529544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'genre',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'length',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'decimal',
            precision: 2,
            scale: 1,
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie');
  }
}
