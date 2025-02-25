import { TimeSeriesGraphClass } from "../components/Graph_Components/TimeSeriesGraphClass";
import { sendLog } from "../logger-frontend";
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
        for(const csv of this.model.getData()){
            if(csv.getDisplayBoard() == 1){
                csv.setVRSelected(true);
                const graph = new TimeSeriesGraphClass(csv);
                graph.setName(csv.getName());
                graph.addPoint();
                mainController.getGraphController().getModel().getData().push(graph)
                console.log("Success on generate?")
                sendLog("info","generate has pushed a new graph");
            }
        }   
    }
    getVRSelected(): CSVDataObject{
        let file:CSVDataObject = new CSVDataObject();
        for(const csv of this.model.getData()){
            if(csv.getVRSelected()){
                file = csv;
                sendLog("info",`getVRSelected has returned ${csv.name}`);
                return csv;
            }
        }
        sendLog("info","getVRSelected has returned an empty CSVDataObject");
        return file;
    }
    
}