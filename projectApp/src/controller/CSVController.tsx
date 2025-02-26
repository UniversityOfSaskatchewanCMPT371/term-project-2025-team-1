import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { sendLog } from "../logger-frontend";
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
<<<<<<< HEAD
                mainController.getGraphController().getModel().getData().push(graph)
=======
                //tester comment: dont be afraid to use some constant variables
                //obj1.getObj2().getObj3().getObj4(),   vs
                //obj2: class2 = obj1.getObj2, obj3: class3 = obj2.getObj3()...
                //these constants will only exist in this if statement
                mainController.getGraphController().pushDataToModel(graph)
>>>>>>> ID2-Testing
                console.log("Success on generate?")
                sendLog("info","generate has pushed a new graph");
            }
        }
    }

    async loadLocalFile(file: File): Promise<void>{
        try {
            await this.getModel().readLocalFile(file);
        }
        catch(error: unknown){
            //Log the error
            throw error;
        }
    }

    async loadURLFile(csv: string): Promise<void>{
        try{
            await this.getModel().readURLFile(csv);
        }
        catch(error: unknown){
            //Log the error
            throw error;
        }
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
                sendLog("info",`getVRSelected has returned ${csv.name}`);
                return csv;
            }
        }
        sendLog("info","getVRSelected has returned an empty CSVDataObject");
        return file;
    }

    getDataByName(name:string): CSVDataInterface | null{
        return this.model.getCSVFileByName(name);
    }
    
}

