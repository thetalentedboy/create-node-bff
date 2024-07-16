import cache from '@vendor/localCache';
import { REPO_OAUTH_INTERFACE, RepoOAuthInterface } from 'infrastructure/rpc/oauth';
import { Inject, Service } from 'typedi';
import type { UserInfo } from 'infrastructure/rpc/shared';
import { USER_INTERFACE, UserInterface } from './user';
import { UTILS_INTERFACE, UtilsInterface } from './utils';

export const OAUTH_INTERFACE = 'OAuthInterface';

export interface OAuthInterface {
    getAppList(): Promise<[]>;
    getUserInfo(): Promise<UserInfo>;
}

@Service(OAUTH_INTERFACE)
class OAuth implements OAuthInterface {
    @Inject(REPO_OAUTH_INTERFACE) private readonly oauthRepo: RepoOAuthInterface;
    
    @Inject(USER_INTERFACE) private readonly user: UserInterface;

    @Inject(UTILS_INTERFACE) private readonly utils: UtilsInterface;
    
    async getAppList(): Promise<[]> {
        return [];
    }

    async getUserInfo(): Promise<UserInfo> {
        const cacheKey = `userInfo_${this.user.getUserID()}`;
        const cacheList = cache.get<UserInfo>(cacheKey);
        if (cacheList) {
            return cacheList;
        }

        const meta = this.utils.createCommonMetadata();
        const userInfo = await this.oauthRepo.getUserInfo(meta);
        cache.set(cacheKey, userInfo, 10); // 10s 缓存

        return userInfo;
    }
}
