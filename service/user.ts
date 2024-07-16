import Container, { Service } from 'typedi';
import { X_BIZCTX_HEADER } from 'config/config';
import type { RequestHeaders } from '../types/shared';

export const USER_INTERFACE = 'UserInterface';

export interface UserInterface {
    getUserID(): number; // 获取用户ID
}

@Service(USER_INTERFACE)
class User implements UserInterface {
    getUserID() {
        const headers = Container.get<RequestHeaders>(X_BIZCTX_HEADER);
        const userId = headers['x-bizctx-uid'];
        return Number(userId);
    }
}
