export default class Response {
    output: string | object;
    status: number;
    constructor();
    getOutput(): string | object;
    setOutput(output: any): void;
    getStatus(): number;
    setStatus(status: any): void;
}
