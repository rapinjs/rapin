export default class Log {
    filename: string;
    constructor(filename: string);
    write(message: string): void;
}
