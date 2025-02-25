import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import { CSVDataInterface } from "../types/CSVInterfaces";
import mainController from "./MainController";
/*
* The controller for CSV related actions
*/
export class CSVController implements ControllerInterface{
    model: CSVReaderModel;  //The model used by this controller

    constructor(){
        this.model = new CSVReaderModel();
    }
    
    /** Generates graph and adds points from model
    * Pre-Conditions: The model, mainController, and graphController must be initialized
    * Post-Conditions:
    *    Graphs are created for CSV data objects with `displayBoard` set to 1.
    *    The generated graphs are added to the graph controller's model.
    *    The `VRSelected` property of relevant CSV data objects is set to `true`.
    */
    generate(): void{
        for(const csv of this.model.getData()){
            if(csv.getDisplayBoard() == 1){
                csv.setVRSelected(true);
                const graph = new TimeSeriesGraphObject(csv);
                graph.setName(csv.getName());
                graph.addPoint();
                mainController.getGraphController().pushDataToModel(graph)
                console.log("Success on generate?")
            }
        }
    }

    async loadLocalFile(file: File): Promise<void>{
        await this.getModel().readLocalFile(file);
    }

    async loadURLFile(csv: string): Promise<void>{
        await this.getModel().readURLFile(csv);
    }

    browserCSVFiles():[string, boolean][]{
        return this.getModel().loadedCsvBrowser();
    }

    //This method returns the Model, and allows the controller to use its methods
    getModel(): CSVReaderModel{
        return this.model;
    }

    getModelData(): CSVDataObject[]{
        return this.model.getData();
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

    getDataByName(name:string): CSVDataInterface | null{
        return this.model.getCSVFileByName(name);
    }
    
}

