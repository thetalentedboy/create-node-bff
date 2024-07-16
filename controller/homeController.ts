import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';

@Controller()
@Service()
export class HomeController {
    @Get('/ping')
    getPing(): string {
        return 'pong';
    }
}
