/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@vendor/logger';
import type { InterceptorInterface, Action } from 'routing-controllers';
import { Service } from 'typedi';
import type { HTTPResponseMeta } from 'types/response';

@Service()
export class ResponseWrapperInterceptor implements InterceptorInterface {
    intercept(action: Action, result: any) {
        logger.debug('', 'ResponseWrapperInterceptor return!');
        return {
            no: 0,
            msg: 'success',
            data: result
        } satisfies HTTPResponseMeta<any>;
    }
}