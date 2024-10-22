import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AuthorizerController {
    private jwt;
    constructor(jwt: JwtService);
    handler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class LogoutController {
    constructor();
    handler(res: Response): Promise<Response<any, Record<string, any>>>;
}
