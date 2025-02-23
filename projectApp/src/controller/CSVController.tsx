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
                //any plans to increase number of displays
                csv.setVRSelected(true);
                const graph = new TimeSeriesGraphClass(csv);
                graph.setName(csv.getName());
                graph.addPoint();
                //tester comment: dont be afraid to use some constant variables
                //obj1.getObj2().getObj3().getObj4(),   vs
                //obj2: class2 = obj1.getObj2, obj3: class3 = obj2.getObj3()...
                //these constants will only exist in this if statement
                mainController.getGraphController().getModel().getData().push(graph)
                console.log("Success on generate?")
                sendLog("info","CSVController.generate() has pushed a new graph");
            }
        }   
    }
    getVRSelected(): CSVDataObject{
        let file:CSVDataObject = new CSVDataObject();
        for(const csv of this.model.getData()){
            if(csv.getVRSelected()){
                //returns the first VRSelected?
                file = csv;
                //file is not returned, csv is
                //what is the point of this file variable?
                sendLog("info",`CSVController.getVRSelected() has returned ${csv.name}`);
                return csv;
            }
        }
        //is this not an error? is it supposed to return an empty object? is this intentional?
        sendLog("info","CSVController.getVRSelected() has returned an empty CSVDataObject");
        return file;
    }
    
}