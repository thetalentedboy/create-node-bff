import { Token } from 'typedi';

export const NODE_ENV = process.env.NODE_ENV as string ?? 'development';

export const CLIENT_HOST = process.env.CLIENT_HOST as string ?? 'http://localhost';

export const X_BIZCTX_HEADER = new Token('X_BIZCTX_HEADER');

export const GRPC_ADDRESS = process.env.GRPC_ADDRESS as string ?? 'ec2-1-1-1-1.compute-1.amazonaws.com:10086';
