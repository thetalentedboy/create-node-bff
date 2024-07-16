import { logger } from '@vendor/logger';
import type { NextFunction, Request, Response } from 'express';
import type { ExpressMiddlewareInterface} from 'routing-controllers';
import { Middleware } from 'routing-controllers';
import { GATEWAY_INTERFACE, GatewayInterface } from 'service/gateway';
import { Inject, Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export class ResponseMiddleware implements ExpressMiddlewareInterface {
    @Inject(GATEWAY_INTERFACE) private readonly gateway: GatewayInterface;
    
    use(request: Request, response: Response, next: NextFunction) {
        logger.debug(this.gateway.getRequestId(), `response result: ${request.url} code ${response.statusCode}`);

        next();
    }
}