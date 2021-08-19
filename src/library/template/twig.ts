import * as twig from "twig";
import {DIR_TEMPLATE, isDev} from '../../common'

export default class Twig {
  public data: any;
  constructor() {
    this.data = {};
  }

  public set(key: string, value: object | string | number) {
    this.data[key] = value;
  }

  public async render(template: string) {

    if(isDev) {
      twig.cache(false)
    }

    const p = new Promise((resolve, reject) => {
      twig.renderFile(
        DIR_TEMPLATE + "/template/" + template + ".twig",
        this.data,
        (err, txt) => {
          resolve(txt);
        }
      );
    });

    return await p;
  }
}
