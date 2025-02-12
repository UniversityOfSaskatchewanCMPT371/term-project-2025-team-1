import { GraphController } from "./GraphController";

class MainController {
    private graphController: GraphController
    constructor(){
        this.graphController = new GraphController();
    }

    getGraphController(){
        return this.graphController;
    }
    printConsole(test:string){
        console.log(test);
    }
}

const mainController = new MainController();
export default mainController;