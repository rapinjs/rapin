import { isUndefined } from 'lodash'
export default class Registry {
  private data: object
  constructor(data = {}) {
    this.data = {...data}
  }

  public get(name) {
    return this.data[name]
  }

  public getAll() {
      return {...this.data}
  }

  public set(name, value) {
    this.data[name] = value
  }

  public has(name) {
    return !isUndefined(this.data[name])
  }
}
