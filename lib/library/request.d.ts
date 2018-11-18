export default class Request {
    req: any;
    constructor(req: any);
    readonly post: any;
    readonly get: any;
    readonly cookie: any;
    readonly files: any;
    readonly params: any;
    readonly session: any;
}
