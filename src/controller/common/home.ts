import { Controller } from 'system/common'
import { GET } from 'system/config/routes'

export class ControllerCommonHome extends Controller {
  @GET('/home', 'html')
  public index() {
    this.response.setOutput(this.load.view('common/home', {test: '213123123'}))
  }
}
