import { CreateTimeSeries } from "../components/Graph_Components/CreateTimeSeries";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";

/*
* The controller for CSV related actions
*/
export class CSVController implements ControllerInterface{
    model: CSVReaderModel;  //The model used by this controller

    constructor(){
        this.model = new CSVReaderModel();
    }

    //This method returns the Model, and allows the controller to use its methods
    getModel(){
        return this.model;
    }
    generate(){
        for(let csv of this.model.getData()){
            if(csv.getDisplayBoard() != 0){
                
            }
        }
    }
}