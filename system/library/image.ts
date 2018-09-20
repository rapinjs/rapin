import { isEmpty } from 'lodash'
import { HTTP_SERVER } from 'system/common'
export default class Image {
  public data: object
  constructor() {
    this.data = {}
  }

  public link(image) {
    if (!isEmpty(image)) {
      return HTTP_SERVER + 'static/images/' + image
    }

    return ''
  }
}
