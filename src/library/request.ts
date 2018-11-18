export default class Request {
  public req: any
  constructor(req) {
    this.req = req
  }

  get post() {
    return this.req.body
  }
  get get() {
    return this.req.query
  }
  get cookie() {
    return this.req.cookies
  }
  get files() {
    return this.req.files
  }
  get params() {
    return this.req.params
  }
  get session() {
    return this.req.session
  }
}
