import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import type { Action } from 'routing-controllers';
import { useContainer as useContainerRoutingControllers, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import cors from 'cors';
import { logger } from '@vendor/logger';
import { HomeController } from 'controller/homeController';
import { CLIENT_HOST } from 'config/config';
import { UserController } from 'controller/userController';
import { ResponseMiddleware } from 'middleware/response';
import { HttpErrorMiddleware } from './middleware/error';
import { LoggingMiddleware } from './middleware/logging';

async function bootstrap() {
    const app = express();
    app.set('etag', false);
    app.use(cors({
        origin: CLIENT_HOST,
        credentials: true,
        optionsSuccessStatus: 200
    }));
    app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    useExpressServer(app, {
        authorizationChecker: (action: Action) => {
            const userId = action.request.headers['x-bizctx-uid'];
            return !!userId;
        },
        routePrefix: '/api',
        controllers: [
            HomeController,
            UserController
        ],
        middlewares: [
            HttpErrorMiddleware,
            LoggingMiddleware,
            ResponseMiddleware
        ],
        defaultErrorHandler: false,
    });

    useContainerRoutingControllers(Container);

    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });
}
bootstrap();

process.on('uncaughtException', (err, origin) => {
    const errMsg = `uncaughtException 全局异常\n捕获的异常：${err}\n异常的来源：${origin}`;
    logger.error('', errMsg);
});

process.on('unhandledRejection', (err, origin) => {
    const errMsg = `unhandledRejection Promise未绑定异常\n捕获的异常：${err}\n异常的来源：${origin}`;
    logger.error('', errMsg);
});
