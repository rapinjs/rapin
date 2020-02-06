import * as Koa from 'koa'
export default class Response {
  public output: string|object
  public status: number
  private ctx: Koa.Context
  constructor(ctx: Koa.Context) {
    this.output = ''
    this.status = 200
    this.ctx = ctx
  }

  public set(field: string,  val: string | string[]) {
    this.ctx.set(field, val)
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
