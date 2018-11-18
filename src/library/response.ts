export default class Response {
  public output: string|object
  public status: number
  private ctx: any
  constructor(ctx) {
    this.output = ''
    this.status = 200
    this.ctx = ctx
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

  public redirect(url) {
    this.ctx.redirect(url)
  }
}
