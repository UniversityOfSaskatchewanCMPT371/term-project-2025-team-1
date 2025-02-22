import { CSVController } from "./CSVController";

// Main controller for managing application logic.
export class MainController {
    private csvController: CSVController;
    constructor(){
        this.csvController = new CSVController();
    }

    getCSVController(){
        return this.csvController;
    }
}

const mainController = new MainController();
export default mainController;
