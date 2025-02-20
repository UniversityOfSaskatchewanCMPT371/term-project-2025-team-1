import { GraphClass2 } from "../components/Graph_Components/GraphClass2";
import { CSVDataObject } from "../models/CSVDataObject";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import mainController from "./MainController";
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
            if(csv.getDisplayBoard() == 1){
                csv.setVRSelected(true);
                // mainController.getGraphController().generateTimeSeriesGraph(csv);
                const graph = new GraphClass2(csv);
                graph.setName(csv.getName());
                graph.addPoints();
                mainController.getGraphController().getModel().getData().push(graph)
                console.log("Success on generate?")
                
            }
        }   
    }
    getVRSelected(): CSVDataObject{
        let file:CSVDataObject = new CSVDataObject();
        for(let csv of this.model.getData()){
            if(csv.getVRSelected()){
                file = csv;
                return csv;
            }
        }
        return file;
    }
}