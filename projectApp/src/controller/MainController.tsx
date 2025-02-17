import { CSVController } from "./CSVController";
import { GraphController } from "./GraphController";

//Commenting out graph works its in graph
export class MainController {
    private csvController: CSVController;
    private graphController: GraphController;
    constructor(){
        this.csvController = new CSVController();
        this.graphController = new GraphController();
    }

    getCSVController(){
        return this.csvController;
    }
    getGraphController(){
        return this.graphController;
    }
}

const mainController = new MainController();
export default mainController;