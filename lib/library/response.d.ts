export default class Response {
    output: string | object;
    status: number;
    private ctx;
    constructor(ctx: any);
    getOutput(): string | object;
    setOutput(output: any): void;
    getStatus(): number;
    setStatus(status: any): void;
    redirect(url: any): void;
}
