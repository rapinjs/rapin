import * as fs from "fs";
import * as twig from "twig";

export default class Twig {
  public data: any;
  constructor() {
    this.data = {};
  }

  public set(key: string, value: object | string | number) {
    this.data[key] = value;
  }

  public async render(template: string) {
    const p = new Promise((resolve, reject) => {
      twig.renderFile(
        "src/view/template/" + template + ".twig",
        this.data,
        (err, txt) => {
          resolve(txt);
        }
      );
    });

    return await p;
  }
}
