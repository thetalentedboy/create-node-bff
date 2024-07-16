import type { DataSourceOptions } from 'typeorm';
import { NODE_ENV } from './config';

const TEN_SECONDS = 10 * 1000;

export const appDataSource: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST as string ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME as string ?? 'postgres',
    password: process.env.DB_PASSWORD as string ?? 'password',
    database: process.env.DB_DATABASE as string ?? 'postgres',
    schema: 'public',
    logging: NODE_ENV === 'development',
    entities: ['./entities/*.ts'],
    maxQueryExecutionTime: TEN_SECONDS,
    poolSize: 3
};