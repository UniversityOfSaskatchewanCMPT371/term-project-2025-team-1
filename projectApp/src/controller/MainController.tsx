import { GraphController } from "./GraphController";

export class MainController {
    private graphController: GraphController
    constructor(){
        this.graphController = new GraphController();
    }

    getGraphController(){
        return this.graphController;
    }

}

const mainController = new MainController();
export default mainController;