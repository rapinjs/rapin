import * as fs from "fs"
import * as moment from "moment"
import { DIR_STORAGE, config } from "../common"

if (!fs.existsSync(DIR_STORAGE + "/logs")) {
  fs.mkdirSync(DIR_STORAGE + "/logs")
}
export default class Log {
  public filename: string
  constructor() {
    const { filename } = config.log
    this.filename = DIR_STORAGE + "/logs/" + filename
  }

  public write(message: string) {
    fs.appendFileSync(
      this.filename,
      moment().format("Y-MM-DD HH:mm:ss") + " - " + message + "\r\n"
    )
  }
}
