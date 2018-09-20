export default class Response {
  public output: string|object
  public status: number
  constructor() {
    this.output = ''
    this.status = 200
  }

  public getOutput() {
    return this.output
  }

  public setOutput(output) {
    this.output = output
  }

  public getStatus() {
    return this.status
  }

  public setStatus(status) {
    this.status = status
  }
}
