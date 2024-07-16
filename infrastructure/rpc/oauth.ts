import type { Metadata } from '@grpc/grpc-js';
import { credentials } from '@grpc/grpc-js';
import { oauth } from 'proto-ts/oauth/oauth';
import { Service } from 'typedi';
import { GRPC_ADDRESS } from 'config/config';
import { logger } from '@vendor/logger';
import type { UserInfo } from './shared';

const conn = new oauth.OAuthServiceClient(GRPC_ADDRESS, credentials.createInsecure(), {
    'grpc.keepalive_time_ms': 6 * 1000,
    'grpc.keepalive_timeout_ms': 6 * 1000,
    'grpc.keepalive_permit_without_calls': 1
});

export const REPO_OAUTH_INTERFACE = 'RepoOAuthInterface'; 

export interface RepoOAuthInterface {
    getUserInfo(meta: Metadata): Promise<UserInfo>;  // 登录者用户信息
}

@Service(REPO_OAUTH_INTERFACE)
class OAuthRepo implements RepoOAuthInterface {
    getUserInfo(meta: Metadata): Promise<UserInfo> {
        return new Promise<UserInfo>((resolve, reject) => {
            conn.UserInfo(new oauth.Request(), meta, (err, resp) => {
                logger.debug('', 'grpc called getUserInfo');

                if (err) {
                    reject(err);
                    return;
                }

                const userInfo = resp?.toObject() as UserInfo;
                logger.debug('', 'grpc called getUserInfo result!');
                resolve(userInfo);
            });
        });
    }
}