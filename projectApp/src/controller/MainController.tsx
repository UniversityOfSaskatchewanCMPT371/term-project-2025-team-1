import { GraphController } from "./GraphController";

//Commenting out graph works its in graph
class MainController {
    private graphController: GraphController;
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