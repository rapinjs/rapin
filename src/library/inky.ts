import * as cheerio from 'cheerio'
import {Inky as inkyLibrary} from 'inky'
import * as fs from 'fs'
import * as juice from 'juice'

export default class Inky {
  protected css: string
  protected html: string

  constructor() {
    this.css = ''
  }

  public addStyle(style) {
    this.css += String(fs.readFileSync(style))
  }

  public setHtml(html) {
    this.html = html
  }

  public convert(options = {}, cheerioOpts = { decodeEntities: true }) {
    const i = new inkyLibrary(options)
    const html = cheerio.load(this.html)

    let result = i.releaseTheKraken(html, cheerioOpts)

    result = juice(result, {extraCss: this.css})

    this.setHtml('')
    this.css = ''
    return result
  }
}
