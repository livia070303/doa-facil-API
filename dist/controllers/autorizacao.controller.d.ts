import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Model } from 'mongoose';
interface User {
    _id: string;
    email: string;
    senha: string;
}
export declare class AuthorizerController {
    private jwt;
    private userModel;
    constructor(jwt: JwtService, userModel: Model<User>);
    handler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
