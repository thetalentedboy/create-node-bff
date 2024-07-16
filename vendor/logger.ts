import winston from 'winston';

const log = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console
    ]
});

export const logger = {
    error(requestId: string, msg: string) {
        return log.log('error', {
            request_id: requestId,
            time: new Date(),
            msg
        });
    },
    debug(requestId: string, msg: string) {
        return log.log('debug', {
            request_id: requestId,
            time: new Date(),
            msg
        });
    }
};