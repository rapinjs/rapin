import { isUndefined } from 'lodash'
export default class Registry {
  private data: object
  constructor() {
    this.data = {}
  }

  public get(name) {
    return this.data[name]
  }

  public set(name, value) {
    this.data[name] = value
  }

  public has(name) {
    return !isUndefined(this.data[name])
  }
}
