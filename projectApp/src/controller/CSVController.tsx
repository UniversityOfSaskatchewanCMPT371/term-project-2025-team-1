import { TimeSeriesGraphClass } from "../components/Graph_Components/TimeSeriesGraphClass";
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
    
    /** Generates graph and adds points from model
    * Pre-Conditions: The model, mainController, and graphController must be initialized
    * Post-Conditions:
    *    Graphs are created for CSV data objects with `displayBoard` set to 1.
    *    The generated graphs are added to the graph controller's model.
    *    The `VRSelected` property of relevant CSV data objects is set to `true`.
    */
    generate(){
        for(const csv of this.model.getData()){
            if(csv.getDisplayBoard() == 1){
                csv.setVRSelected(true);
                const graph = new TimeSeriesGraphClass(csv);
                graph.setName(csv.getName());
                graph.addPoint();
                mainController.getGraphController().getModel().getData().push(graph)
                console.log("Success on generate?")
            }
        }
    }
    
    /**
    * Pre-Conditions: The `model` property must be initialized
    * Post-Conditions:
    *    Returns the first CSVDataObject that has VR selected.
    *    If no such object is found, returns a new empty CSVDataObject.
    */
    getVRSelected(): CSVDataObject{
        let file:CSVDataObject = new CSVDataObject();
        for(const csv of this.model.getData()){
            if(csv.getVRSelected()){
                file = csv;
                return csv;
            }
        }
        return file;
    } 
}
