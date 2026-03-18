import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { register } from 'tsconfig-paths';
import * as path from 'path';

// Load environment variables from .env file
config();

// Register tsconfig paths for TypeORM CLI to resolve aliases like @modules, @config, etc.
register({
  baseUrl: path.resolve(__dirname, '../../..'),
  paths: {
    '@/*': ['src/*'],
    '@config/*': ['src/config/*'],
    '@modules/*': ['src/modules/*'],
    '@common/*': ['src/common/*'],
  },
});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'pcms_db',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  timezone: 'Z',
  charset: 'utf8mb4',
  extra: {
    connectionLimit: 10,
  },
};

// DataSource for TypeORM CLI
export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions);
