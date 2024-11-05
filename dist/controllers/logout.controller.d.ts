import { Response } from 'express';
export declare class LogoutController {
    constructor();
    handler(res: Response): Promise<Response<any, Record<string, any>>>;
}
