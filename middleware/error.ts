import type { ExpressErrorMiddlewareInterface} from 'routing-controllers';
import { HttpError, Middleware, NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import { logger } from '@vendor/logger';
import type { NextFunction, Request, Response } from 'express';
import type { HTTPResponseMeta } from 'types/response';
import { HTTPCode } from 'types/response';

@Middleware({ type: 'after' })
@Service()
export class HttpErrorMiddleware implements ExpressErrorMiddlewareInterface {
    // 未授权
    unAuthorized(error: HttpError, response: Response) {
        if (error.httpCode === 401) {
            response.status(200).send({
                no: HTTPCode.UNAUTHORIZED,
                msg: 'unauthorized',
                data: ''
            } satisfies HTTPResponseMeta<string>);
        } else {
            response.status(error.httpCode).send({
                no: HTTPCode.ERROR,
                msg: error.message,
                data: ''
            } satisfies HTTPResponseMeta<string>);
        }
    }

    // 页面不存在
    notfound(error: NotFoundError, response: Response) {
        if (error instanceof NotFoundError) {
            response.status(404).send({
                no: HTTPCode.ERROR,
                msg: 'page not found',
                data: ''
            } satisfies HTTPResponseMeta<string>);
        }
    }

    // 未知错误
    unknownError(error: Error, request: Request, response: Response) {
        const { method, originalUrl } = request;
        
        let params = '';
        switch (method.toUpperCase()) {
            case 'POST':
                params = JSON.stringify(request.body);
                break;
            case 'GET':
                params = JSON.stringify(request.query);
                break;
            default:
        }
        
        const errorMessage = `${originalUrl} : params ${params}\n${error.message}\n${error.stack}`;
        logger.error('', errorMessage);

        response.status(500).send(process.env.NODE_ENV === 'development' ? errorMessage : 'server error');
    }

    error(error: Error, request: Request, response: Response, next: NextFunction): void {
        if (error instanceof HttpError) {
            this.unAuthorized(error, response);
            return;
        }

        if (error instanceof NotFoundError) {
            this.notfound(error, response);
            return;
        }

        if (error) {
            this.unknownError(error, request, response);
            return;
        }
        
        next(error);
    }
}