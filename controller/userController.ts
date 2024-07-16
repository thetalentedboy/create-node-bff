import { Inject, Service } from 'typedi';
import { Authorized, Controller, Get, UseInterceptor } from 'routing-controllers';
import { ResponseWrapperInterceptor } from 'Interceptor/responseWrapper';
import { OAUTH_INTERFACE, OAuthInterface } from 'service/oauth';

@Controller('/user')
@Service()
export class UserController {
    @Inject(OAUTH_INTERFACE) private readonly oauth: OAuthInterface;

    @Get('/info')
    @Authorized()
    @UseInterceptor(ResponseWrapperInterceptor)
    appList() {
        return this.oauth.getUserInfo();
    }
}