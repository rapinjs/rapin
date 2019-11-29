export default class Request {
  public req: any
  public postData: any
  public getData: any
  public paramsData: any
  constructor(req) {
    this.req = req
    this.postData = req.body
    this.getData = req.query
    this.paramsData = req.params
  }

  get ip() {
    return this.req.ip.replace('::ffff:', '')
  }

  get headers() {
    return this.req.req.headers
  }

  get post() {
    return this.postData
  }
  set post(value) {
    this.postData = value
  }
  get get() {
    return this.getData
  }
  set get(value) {
    this.getData = value
  }
  get cookie() {
    return this.req.cookie
  }
  get files() {
    return this.req.files
  }
  get params() {
    return this.paramsData
  }
  set params(value) {
    this.paramsData = value
  }
  get session() {
    return this.req.session
  }
}
