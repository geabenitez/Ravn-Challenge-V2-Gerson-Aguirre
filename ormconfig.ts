import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT, 10),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsTableName: 'migrations',
  synchronize: false,
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
};

export { config };
export default new DataSource(config);
