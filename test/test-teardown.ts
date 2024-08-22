import { DataSource } from 'typeorm';

module.exports = async () => {
  if (global.app) {
    const dataSource = global.app.get(DataSource);
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  }
};
