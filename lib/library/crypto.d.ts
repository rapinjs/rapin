export default class Crypto {
    data: object;
    constructor();
    getHashPassword(password: any, salt?: string): {
        salt: any;
        hash: string;
    };
    sha512(password: any, salt: any): {
        salt: any;
        hash: string;
    };
    token(length: any): string;
}
