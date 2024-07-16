import cache from '@vendor/localCache';
import { Inject, Service } from 'typedi';
import { USER_INTERFACE, UserInterface } from './user';

export const GATEWAY_INTERFACE = 'GatewayInterface';

export interface GatewayInterface {
    getRequestId(): string;
    setRequestId(requestId: string): void
}

@Service(GATEWAY_INTERFACE)
class Gateway implements GatewayInterface {
    @Inject(USER_INTERFACE) private readonly user: UserInterface;

    private requestIdPrefix = 'request_id_';

    getRequestId(): string {
        const userId = this.user.getUserID();
        const requestIdKey = `${this.requestIdPrefix}${userId}`;
        return cache.get(requestIdKey) ?? '';
    }
    
    setRequestId(requestId: string): void {
        const userId = this.user.getUserID();
        const requestIdKey = `${this.requestIdPrefix}${userId}`;
        cache.set(requestIdKey, requestId, 60); // 60s 过期时间
    }
}
