import { CSVController } from "./CSVController";

//Commenting out graph works its in graph
export class MainController {
    private csvController: CSVController;
    constructor(){
        this.csvController = new CSVController();
    }

    getController(){
        return this.csvController;
    }
}

const mainController = new MainController();
export default mainController;