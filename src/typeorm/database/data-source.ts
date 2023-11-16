// data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'alpine',
  database: 'postgres',
  entities: ['src/**/*.entity{.js,.ts}'],
};

export default new DataSource(dataSourceOptions);
