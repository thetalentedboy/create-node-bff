import { Metadata } from '@grpc/grpc-js';
import { X_BIZCTX_HEADER } from 'config/config';
import Container, { Inject, Service } from 'typedi';
import { logger } from '@vendor/logger';
import type { RequestHeaders } from '../types/shared';
import { GATEWAY_INTERFACE, GatewayInterface } from './gateway';

export const UTILS_INTERFACE = 'UtilsInterface';

export interface UtilsInterface {
    createCommonMetadata(): Metadata; // 创建通用Metadata
}

@Service(UTILS_INTERFACE)
class Utils implements UtilsInterface {
    @Inject(GATEWAY_INTERFACE) private readonly gateway: GatewayInterface;

    createCommonMetadata() {
        const header = Container.get<RequestHeaders>(X_BIZCTX_HEADER);
        const meta = new Metadata();

        const logObj: Record<string, string> = {};
        Object.keys(header).forEach(key => {
            if (
                key.indexOf('x-bizctx') > -1 ||
                key.indexOf('x-request-id') > -1
            ) {
                meta.set(key, header[key]);
                logObj[key] = header[key];
            }
        });

        logger.debug(
            this.gateway.getRequestId(),
            `meta${JSON.stringify(logObj)}`
        );

        return meta;
    }
}
