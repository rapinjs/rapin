export default class ControllerCommonHome extends Controller {
    index(){
        this.response.setOutput(this.load.view('common/home', {}))
    }
}