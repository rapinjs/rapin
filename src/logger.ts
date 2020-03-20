import {isDev} from './common'
const colors = require('colors')
export class Logger {
  private name: string
  private time: number
  constructor (name: string) {
    this.name = name
    this.time = this.getTime()
  }
  private getTime() {
    const d = new Date()
    return d.getTime()
  }

  public end(){
    if(isDev) {
      const diff = this.getTime() - this.time

      console.log(colors.red(`[Rapin JS]   `) + colors.green(this.name) + colors.yellow(` +${diff}ms`))
    }
  }
}