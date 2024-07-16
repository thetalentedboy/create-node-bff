import type { NextFunction, Request, Response } from 'express';
import type { ExpressMiddlewareInterface} from 'routing-controllers';
import { Middleware } from 'routing-controllers';
import { GATEWAY_INTERFACE, GatewayInterface } from 'service/gateway';
import Container, { Inject, Service } from 'typedi';
import { X_BIZCTX_HEADER } from 'config/config';
import { logger } from '@vendor/logger';

@Middleware({ type: 'before' })
@Service()
export class LoggingMiddleware implements ExpressMiddlewareInterface {
    @Inject(GATEWAY_INTERFACE) private readonly gateway: GatewayInterface;

    use(request: Request, response: Response, next: NextFunction) {
        const ignoreKey = ['content-length'];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const headers = <Record<string, any>> {};
        Object.keys(request.headers).forEach(key => {
            if (ignoreKey.indexOf(key) === -1) {
                headers[key] = request.headers[key];
            }
        });
        Container.set(X_BIZCTX_HEADER, request.headers);
        
        // 拦截网关的request-id
        // 然后设置到全局，供全局使用
        const requestId = request.headers['x-request-id'] as string ?? '';

        this.gateway.setRequestId(requestId);

        logger.debug(requestId, `request url: ${request.url}`);

        next();
    }
}