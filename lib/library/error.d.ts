export default class Error {
    error: object[];
    description: object;
    constructor();
    set(error: any, system_message?: string): void;
    get(): {};
}
