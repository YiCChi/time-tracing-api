import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'develop',
  synchronize: true,
  logging: true,
  subscribers: [],
  entities: ['src/**/entities/*.ts'],
  migrations: ['db/migrations/*.ts'],
});
